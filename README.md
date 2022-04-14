
# Twin Cities Startup Week Session Selector and Voting Portal

The TCSW Session Selector and Voting App will be used in conjunction with TCSW's primary website and September 2022 conference. When the portal is open for submissions from the public (April 4, 2022 - May 15, 2022), a user will login and be able to submit their proposed "session" (e.g. panel, roundtable, etc. ) after filling out a form with a list of questions. An admin (separate login) will be able to login and "approve" or "reject" sessions from a queue from the general public. Once submissions have closed (May 15,2022), users will be invited to up vote or down vote on the panels that have been approved. There will be one up vote/down vote per person per submitted session and sessions with the most up votes will have some influence on the schedule for TCSW 2022, but other factors will also be taken into consideration (voting will be open from May 23, 2022 - June 5, 2022). Users will also be able to search for a specific panel and sort by certain panel parameters as well as generate a link to share voting info on social media. Finally, there will be a leaderboard page to show logged in users where their panels stand in the voting ranks.

Stretch Goals:
Google Analytics
Download DB as a .csv file


A deployed version of the app can be found here: https://arcane-hamlet-54349.herokuapp.com/#/home


## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

* [Node.js](https://nodejs.org/en/)
* [PostrgeSQL](https://www.postgresql.org/)
* [Nodemon](https://nodemon.io/)

## Environment variables

```
NODE_ENV=development
SERVER_SESSION_SECRET=some_secret
SENDGRID_API_KEY=
SENDGRID_FROM_ADDRESS=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
REACT_APP_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
DATABASE_NAME=session_submission
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
S3_BUCKET_NAME=session-selector
HONEYBADGER_API_KEY=
```

> NOTE: The recaptcha keys above are provided by Google for development use. Replace with real keys in production.

## Installation

1. Create a `.env` file (see above)
1. Run `npx sequelize-cli db:create`
1. Run `npx sequelize-cli db:migrate`
1. Run `npx sequelize-cli db:seed:all`
1. Open your code editor of choice and run `npm install` to install all dependencies.
1. Run `npm run server` and `npm run client` 
1. Navigate to `localhost:3000` and voila!

## Setting up Google Auth

In order to use Google Auth, a `GOOGLE CLIENT ID` and `GOOGLE CLIENT SECRET` must be added to your .env file.

1. Create a Google Cloud Project Account: https://console.cloud.google.com/
2. Create an account with one of your email accounts and agree to terms of service.
3. In the left hand menu, click `APIs and Services`
4. Click `OAuth and Consent` Screen
5. Click `Create Project` on the right hand side.
6. Name your project (Session Selector)
7. Click `external` under `user type`
  * If you are not automatically brought to the User Type page, click 'APIs and Services' on the left side menu, the OAuth Consent Screen.
8. Click 'Create'
9. App Information:
  * App Name: Session Selector
  * User Support Email: your email address
  * Developer contact information: your email address
  * If this app is about to go to production, this information will need to be changed to the developer's and the client's information that will be handling app support.
10. Scope: You don't need any of this. Scroll down to the bottom and click 'Save' and continue.
11. Test Users:
  * Click + ADD USERS and add yourself for testing purposes. You will need to click 'ADD' twice in the pop out.
  * Click 'Save and Continue'
12. Summary Page: scroll down to the bottom and click 'Back to the Dashboard'
13. On the lefthand side, click 'Credentials'
  * Click + CREATE CREDENTIALS at the top of the page
  * Select OAuth Client ID
14. On the Create OAuth Client ID page [Photo]('public/images/photo 1 google oauth.png')
  * Application type: Web Application
  * Name: Session Selector
  * Add the Javascript URIs:
    * http://localhost:3000
    * http://localhost:5000
  * Add the redirect URIs:
    * http://localhost:3000
    * http://localhost:5000/auth/google/callback
15.  Click 'Create'
16. You will be brought back to the Credentials page. Click the project name you just created under OAuth 2.0 Client IDs.
17.  On the right hand side of your page you will see your own Client ID and Client Secret. DO NOT SHARE THESE. [Photo]('public/images/photo 2 google oauth.png')
18. In your text editor, (VSCode or equivalent), add a .env file at the same level as your .gitignore
19. Add the Client ID to your .env file as:
  * GOOGLE_CLIENT_ID=YOURIDHERE
20. Add the Client Secret to your .env as:
  * GOOGLE_CLIENT_SECRET=YOURSECRETHERE
  * Make sure there are no spaces in this file.
21. If for some reason you accidentally share your client secret, the button at the top of your page labeled RESET SECRET can be reset at any time. Just remember to update it in your .env file!

## Database Migrations

To create a new database migration:

```
npx sequelize-cli migration:create --name name_of_migration
```

The above command will create a file in `server/migrations/` that you will want to add your migration code to. More information can be found https://sequelize.org/master/manual/migrations.html and https://github.com/sequelize/cli

After creating the migration, you can run it locally with: `npx sequelize-cli db:migrate` or undo the migration with `npx sequelize-cli db:migrate:undo`. The application keeps track of which migrations have run in the `sequelize_migrations` table. That table is created during the first migration.

Migration scripts are run automatically in production through the `Procfile`. 

## Seed data

- `npx sequelize-cli db:seed:all` will run all seeds
- `npx sequelize-cli db:seed:undo` will undo the last seed
- `npx sequelize-cli db:seed:undo:all` will undo all seeds

## Technologies Used

- Javascript, HTML, CSS, Material UI, React, Redux, Redux Sagas, Express, Node, PostgreSQL, Google OAuth

## Acknowledgements

We would like to thank our instructor, Chris Black, as well as everyone in the Proth Cohort and everyone on staff at Prime Digital Academy for turning us into full stack developers in a mere matter of weeks! Additional thanks to Kelly Schultze and her team at Beta.MN for giving us the opportunity to develop the submission portal for Twin Cities Startup Week 2022!

## Support

If you have feedback or issues with the app, you can contact us at:

Jessica Buckwalter: jessica.a.buckwalter@gmail.com
Sarah Helgen: sarah.helgen@gmail.com
Ahmed Noor: ahmednoor7252@gmail.com
Tou Xiong: tlxiong.prime@outlook.com










