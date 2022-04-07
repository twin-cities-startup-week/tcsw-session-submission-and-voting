const Sequelize = require('sequelize');
const express = require('express');
const axios = require('axios');
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
const cryptoRandomString = require('crypto-random-string');
const {
  rejectUnauthenticated,
  getIpAddress,
} = require('../modules/authentication-middleware');
const { logError } = require('../modules/logger');
const encryptLib = require('../modules/encryption');
const { pool } = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const User = require('../models/user.model.js');

const router = express.Router();

const {
  updateResetToken,
  setPasswordWithToken,
} = require('../queries/user.query');

// Google OAuth
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, async (req, res) => {
  try {
    const ipAddress = getIpAddress(req);
    await User.update({
      current_sign_in_ip: ipAddress,
      current_sign_in_at: Sequelize.literal('CURRENT_TIMESTAMP'),
    }, {
      where: {
        id: req.user.id,
      },
    });
    // Send back user object from the session (previously queried from the database)
    res.send(req.user);
  } catch (e) {
    logError(e);
    res.status(500).send('Unable to get user.');
  }

});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', async (req, res, next) => {
  try {
    const password = encryptLib.encryptPassword(req.body.password);
    const email = req.body.email.toLowerCase();
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    let ipAddress = 'unknown';
    if (req.socket) {
      ipAddress = req.headers['x-forwarded-for']
        || req.socket.remoteAddress;
    }
    const params = {
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: req.body.token,
    };
    if (process.env.NODE_ENV === 'production' && ipAddress) {
      params.remoteip = ipAddress;
    }
    let captcha = {};
    if (process.env.NODE_ENV === 'test') {
      captcha = {
        data: { success: true },
      };
    } else {
      captcha = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
        params,
      });
    }
    if (captcha && captcha.data && captcha.data.success === true) {
      const queryText = `INSERT INTO "user" (password, email, first_name, last_name, current_sign_in_ip)
      VALUES ($1, $2, $3, $4, $5) RETURNING id`;
      pool
        .query(queryText, [password, email, firstName, lastName, ipAddress])
        .then(() => {
          // if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY !== '') {
          //   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          //   const msg = {
          //     to: email,
          //     from: process.env.SENDGRID_FROM_ADDRESS,
          //     subject: 'Welcome!',
          //     text: `Welcome to the TCSW session selector!`,
          //     html: `Welcome to the TCSW session selector!`,
          //   };
          //   sgMail.send(msg).catch(e => console.log(e));
          // } else {
          //   console.error('Missing SendGrid environment variables.')
          // }
          res.sendStatus(201)
        })
        .catch((err) => {
          logError(err);
          res.sendStatus(500);
        });

    } else {
      res.status(500).send('Unable to validate recaptcha.');
    }
  } catch (e) {
    logError(e);
    res.status(500).send('Unable to create account.');
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', async (req, res) => {
  try {
      // Use passport's built-in method to log out the user
      await req.logout();
      await res.clearCookie('user');
      await res.clearCookie('user.sig');
      req.session = null;
      res.sendStatus(200);
  } catch(e) {
      logError(e);
      res.sendStatus(500);
  };
});

/**
 * @api {put} /users/password/change User Change Password
 * @apiName UserChangePassword
 * @apiGroup User
 * @apiDescription Change the password for the logged in user.
 *
 * @apiParam {String} oldPassword          Mandatory old password.
 * @apiParam {String} newPassword          Mandatory new password.
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 */
router.put('/password/change', rejectUnauthenticated, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;
    if (newPassword.length < 8) {
      res.status(500).send('Password must be 8 characters or more.');
    } else {
      await changeUserPassword(userId, oldPassword, newPassword);
      res.sendStatus(200);
    }
  } catch(e) {
    logError(e);
    let errorMessage = `${e.name}: ${e.message}`;
    if (e.parent && e.parent.detail) {
      errorMessage += `: ${e.parent.detail}`;
    }
    res.status(500).send(errorMessage);
  };
});

/**
 * @api {put} /users/password User New Password
 * @apiName UserNewPassword
 * @apiGroup User
 * @apiDescription Set a new password for the user with a reset token.
 *
 * @apiParam {String} email                Mandatory user email.
 * @apiParam {String} newPassword          Mandatory new password.
 * @apiParam {String} token                Mandatory token.
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 */
router.put('/password/new', async (req, res) => {
  try {
    const { email, password, token } = req.body;
    if (password.length < 8) {
      res.status(500).send('Password must be 8 characters or more.');
      return;
    }
    let user = await setPasswordWithToken(email.toLocaleLowerCase(), password, token);
    if (user && user.email && process.env.SENDGRID_API_KEY) {
      res.status(200).send(user);
    } else {
      res.status(500).send('Unable to reset password.');
    }
  } catch(e) {
    logError(e);
    let errorMessage = `${e.name}: ${e.message}`;
    if (e.parent && e.parent.detail) {
      errorMessage += `: ${e.parent.detail}`;
    }
    res.status(500).send(errorMessage);
  };
});

/**
 * @api {put} /users/password/reset User Reset Request
 * @apiName UserResetRequest
 * @apiGroup User
 * @apiDescription Send a url to reset the password for the provided email. If no user is found
 * with the provided email, an error will be thrown.
 *
 * @apiParam {String} email                Mandatory user email.
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 */
router.put('/password/reset', async (req, res) => {
  try {
    const resetToken = cryptoRandomString({ length: 64, type: 'hex' });
    let user = await updateResetToken(req.body.email.toLowerCase(), resetToken);
    const hasEnvVariables = process.env.SENDGRID_API_KEY && process.env.SENDGRID_FROM_ADDRESS;
    if (user && user.email && hasEnvVariables) {
      let resetUrl = `https://${req.hostname}/#/password/reset/${resetToken}`;
      if (process.env.NODE_ENV !== 'production') {
        resetUrl = `http://${req.hostname}:3000/#/password/reset/${resetToken}`;
      }
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: user.email,
        from: process.env.SENDGRID_FROM_ADDRESS,
        subject: 'Reset Password',
        text: `If you did not request a password reset, please discard this email. To reset your password, visit this url: ${resetUrl}`,
        html: `If you did not request a password reset, please discard this email. <a href="${resetUrl}">Click here</a> to reset your password.`,
      };
      sgMail.send(msg).catch(e => logError(e));
      res.sendStatus(200);
    } else {
      if (!hasEnvVariables) {
        logError('Missing SendGrid environment variables.');
      }
      res.status(500).send('Unable to reset password.');
    }
  } catch(e) {
    logError(e);
    let errorMessage = `${e.name}: ${e.message}`;
    if (e.parent && e.parent.detail) {
      errorMessage += `: ${e.parent.detail}`;
    }
    res.status(500).send(errorMessage);
  };
});


module.exports = router;
