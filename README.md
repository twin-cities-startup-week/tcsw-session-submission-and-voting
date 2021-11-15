
# Twin Cities Startup Week Session Selector and Voting Portal
The TCSW Session Selector and Voting App will be used in conjunction with TCSW's primary website and September 2022 conference. When the portal is open for submissions from the public (April 4, 2022 - May 15, 2022), a user will login and be able to submit their proposed "session" (e.g. panel, roundtable, etc. ) after filling out a form with a list of questions. An admin (separate login) will be able to login and "approve" or "reject" sessions from a queue from the general public. Once submissions have closed (May 15,2022), users will be invited to up vote or down vote on the panels that have been approved. There will be one up vote/down vote per person per submitted session and sessions with the most up votes will have some influence on the schedule for TCSW 2022, but other factors will also be taken into consideration (voting will be open from May 23, 2022 - June 5, 2022). Users will also be able to search for a specific panel and sort by certain panel parameters as well as generate a link to share voting info on social media. Finally, there will be a leaderboard page to show logged in users where their panels stand in the voting ranks.

Stretch Goals:
Google Analytics
Download DB as a .csv file


A deployed version of the app can be found here: ADD LINK ONCE DEPLOYED

## Screenshots

[ADD SCREENSHOTS HERE]

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Installation

1. Create a database named `session_submission`.
2. The queries in the `database.sql` file are all set up for you. This project was built in Postgres, so you will need to have that installed and we recommend using Postico to run queries, as that is what we used to test our data.
3. In the .env file, you will need to update the session secret, otherwise you will get a warning. You can use https://passwordsgenerator.net/ to generate a random string for your session secret password.
3. Open your code editor of choice and run `npm install` to install all dependencies.
4. Run `npm run server` and `npm run client` 
5. Navigate to `localhost:3000` and voila!

## Setting up Google Auth

In order to use Google Auth, a `GOOGLE CLIENT ID` and `GOOGLE CLIENT SECRET` must be added to your .env file.

1. Create a Google Cloud Project Account: https://console.cloud.google.com/
2. Create an account with one of your email accounts and agree to terms of service.
3. In the left hand menu, click `APIs and Services`
4. Click `OAuth and Consent` Screen
5. Click `Create Project` on the right hand side.
6. Name your project (Session Selector)
7. Click `external` under `user type`
8. 


## Technologies Used
- Javascript, HTML, CSS, Material UI, React, Redux, Redux Sagas, Express, Node, PostgreSQL, Google OAuth

## Acknowledgements
We would like to thank our instructor, Chris Black, as well as everyone in the Proth Cohort and everyone on staff at Prime Digital Academy for turning us into full stack developers in a mere matter of weeks! Additional thanks to Kelly Schultze and her team at Beta.MN for giving us the opportunity to develop the submission portal for Twin Cities Startup Week 2022!

## Support
If you have feedback or issues with the app, you can contact us at

[Jessica Buckwalter](jessica.a.buckwalter@gmail.com)
[Sarah Helgen](sarah.helgen@gmail.com)
[Ahmed Noor](ahmednoor7252@gmail.com)
[Tou Xiong](tlxiong.prime@outlook.com)










