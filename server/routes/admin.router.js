const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// const {
//     rejectUnauthenticated,
//   } = require('../modules/authentication-middleware');



/**
 * GET route admin
 */
 router.get('/', (req, res) => {
    // GET route code here
    pool.query(`SELECT * from "sessions"`)
    .then((results) =>
     res.send(results.rows))
     .catch((error) => {
         console.log('Error making GET request:', error);
         res.sendStatus(500);
     });
});

/**
 * GET route admin
//  */
router.get('/sessionsApproved', (req, res) => {
    // GET route code here
    console.log('This is the sessions you wanted')
    pool.query(`SELECT count(sessions.title) from "sessions" 
    WHERE sessions.approved = true`)
    .then((results) => {
        console.log(results.rows)
        res.send(results.rows)
    })
     .catch((error) => {
         console.log('Error making GET request:', error);
         res.sendStatus(500);
     });
});



/**
 * GET route admin
//  */
router.get('/sessionsVotes', (req, res) => {
    // GET route code here
   console.log('This is the sessionsVotes you wanted') 
    //console.log('This is the sessionsVotes you wanted', req.params.sessionsVotes)
    pool.query(`SELECT title, votes FROM sessions 
    ORDER BY "votes" DESC LIMIT 1;
    `)
    .then((results) =>
     res.send(results.rows))
     .catch((error) => {
         console.log('Error making GET request:', error);
         res.sendStatus(500);
     });
});




// /**
//  * GET route admin
// //  */
router.get('/awaitingApproval', (req, res) => {
    // GET route code here
    console.log('This is the awaitingApproval you wanted', req.params);
    //console.log(req.params)
    pool.query(`SELECT count(sessions.id) from "sessions"
    WHERE sessions.awaiting_approval = true;
    `)
    .then((results) =>
     res.send(results.rows))
     .catch((error) => {
         console.log('Error making GET request:', error);
         res.sendStatus(500);
     });
});


/**
 * GET route admin
 */
 router.get('/', (req, res) => {
    // GET route code here
    pool.query(`SELECT * from "sessions" 
    WHERE awaiting_approval = true`)
    .then((results) =>
     res.send(results.rows))
     .catch((error) => {
         console.log('Error making GET request:', error);
         res.sendStatus(500);
     });
});



/**
 * GET route admin
 */
 router.get('/', (req, res) => {
    // GET route code here
    pool.query(`SELECT * from "sessions" 
    WHERE approved = true`)
    .then((results) =>
     res.send(results.rows))
     .catch((error) => {
         console.log('Error making GET request:', error);
         res.sendStatus(500);
     });
});

module.exports = router;