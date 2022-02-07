const express = require('express');
const { pool } = require('../modules/pool');
const router = express.Router();

const {
    requireAdmin,
} = require('../modules/authentication-middleware');



/**
 * GET route admin
 */
 router.get('/', requireAdmin, (req, res) => {
    // GET route code here
    pool.query(`SELECT * from "session"`)
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
router.get('/sessionsApproved', requireAdmin, (req, res) => {
    // GET route code here
    console.log('This is the sessions you wanted')
    pool.query(`SELECT count(session.title) from "session" 
    WHERE session.approved = true`)
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
router.get('/sessionsVotes', requireAdmin, (req, res) => {
    // GET route code here
   console.log('This is the sessionsVotes you wanted') 
    //console.log('This is the sessionsVotes you wanted', req.params.sessionsVotes)
    pool.query(`SELECT title, votes FROM session
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
router.get('/awaitingApproval', requireAdmin, (req, res) => {
    // GET route code here
    console.log('This is the awaitingApproval you wanted', req.params);
    //console.log(req.params)
    pool.query(`SELECT count(session.id) from "session"
    WHERE session.awaiting_approval = true;
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
 router.get('/awaitingApprovalList', requireAdmin, (req, res) => {
    // GET route code here
    pool.query(`SELECT * from "session" 
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
 router.get('/approvedList', requireAdmin, (req, res) => {
    // GET route code here
    pool.query(`SELECT * from "session" 
    WHERE approved = true`)
    .then((results) =>
     res.send(results.rows))
     .catch((error) => {
         console.log('Error making GET request:', error);
         res.sendStatus(500);
     });
});

module.exports = router;