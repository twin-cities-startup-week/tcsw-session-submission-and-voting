
# Twin Cities Startup Week Session Selector and Voting
The TCSW Session Selector and Voting App will be used in conjunction with TCSW's primary website and September 2022 conference. When the portal is open for submissions from the public (April 4, 2022 - May 15, 2022), a user will login and be able to submit their proposed "session" (e.g. panel, roundtable, etc. ) after filling out a form with a list of questions. An admin (separate login) will be able to login and "approve" or "reject" sessions from a queue from the general public. Once submissions have closed (May 15,2022), users will be invited to up vote or down vote on the panels that have been approved. There will be one up vote/down vote per person per submitted session and sessions with the most up votes will have some influence on the schedule for TCSW 2022, but other factors will also be taken into consideration (voting will be open from May 23 - June 5, 2022). Users will also be able to search for a specific panel and sort by certain panel parameters as well as generate a link to share voting info on social media. Finally, there will be a leaderboard page to show logged in users where their panels stand in the voting ranks.

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

## Create database and table

Create a new database called `prime_app` and create a `user` table:

```SQL
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
```

If you would like to name your database something else, you will need to change `prime_app` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Technologies Used










