const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const { pool } = require('./modules/pool');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const fileUpload = require('express-fileupload');

let callbackURL = `https://sessions.twincitiesstartupweek.com/auth/google/callback`;
if (process.env.NODE_ENV !== 'production') {
    callbackURL = `http://localhost:5000/auth/google/callback`;
}
console.log('callbackURL', callbackURL);

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  //   Use the GoogleStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, an accessToken, refreshToken, and Google
  //   profile), and invoke a callback with a user object.
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL,
    }, async (accessToken, refreshToken, profile, done) => {
      console.log('Google login complete!', profile);
      // profile.id will need to be stored in the user record
      // 1. Query to see the user exists
      let user = null;
      try {
        if (profile.emails.length > 0) {
          const firstEmail = profile.emails[0];
          if (firstEmail.verified === true) {
            const result = await pool.query('SELECT * FROM "user" WHERE email = $1', [firstEmail.value]);
            const user = result && result.rows && result.rows[0];
            if (user) {
              console.log('Existing user found!', user);
              return done(null, user);
            } else {
              const password = null; // TODO: Make sure this is OK
              const email = firstEmail.value;
              const firstName = profile.name.givenName;
              const lastName = profile.name.familyName;
              const googleId = profile.id;

              const queryText = `INSERT INTO "user" (email, password, first_name, last_name, google_id)
                VALUES ($1, $2, $3, $4, $5) RETURNING id`;
              await pool.query(queryText, [email, password, firstName, lastName, googleId]);
              const result = await pool.query('SELECT * FROM "user" WHERE email = $1', [email]);
              const user = result && result.rows && result.rows[0];
              if (user) {
                console.log('New user created!', user);
                return done(null, user);
              } else {
                // Something went wrong when creating the user...
                return done(null, null);
              }
            }
          } else {
            // Email not verified
            return done(null, null);
          }
        } else {
          // No email found
          return done(null, null);
        }
        
      } catch (error) {
          console.log('Error with query for user ', error);
          // done takes an error (we have one) and a user (null in this case)
          // this will result in the server returning a 500 status code
          return done(error, null);
      }
    }
  ));
} else {
  console.warn('MISSING .env variables!!!');
}

// Route includes
const userRouter = require('./routes/user.router');
const panelistRouter = require('./routes/panelist.router');
const submissionRouter = require('./routes/submission.router');
const adminRouter = require('./routes/admin.router');
const contentRouter = require('./routes/content.router');

const requireHTTPS = require('./modules/require.https.js');
// Redirect HTTP to HTTPS in production
app.use(requireHTTPS);

// Accept photo uploads
app.use(fileUpload());

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  // GET /auth/google
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Google authentication will involve
  //   redirecting the user to google.com.  After authorization, Google
  //   will redirect the user back to this application at /auth/google/callback
  app.get('/auth/google',
    passport.authenticate('google', { scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/userinfo.email',
    ] }));

  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'https://sessions.twincitiesstartupweek.com/#/login' }),
    (req, res) => {
      console.log('HERE: /auth/google/callback');
      if (process.env.NODE_ENV !== 'production') {
        res.redirect('http://localhost:3000/#/home');
      } else {
        res.redirect('https://sessions.twincitiesstartupweek.com/#/home'); // TODO: After login page.
      }
    }
  );
}

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/panelists', panelistRouter);
app.use('/api/submission', submissionRouter );
app.use('/api/session', adminRouter);
app.use('/api/content', contentRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
