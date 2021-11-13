const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// const {
//     rejectUnauthenticated,
//   } = require('../modules/authentication-middleware');

/**
 * GET route admin
 */
router.get('/total', (req, res) => {
    // GET route code here
    pool.query(`SELECT count(session.title) from "session" 
    WHERE session.approved = $1`, [req.session.id])
    .then((results) =>
     res.send(results.rows))
     .catch((error) => {
         console.log('Error making GET request:', error);
         res.sendStatus(500);
     });
});



// /**
//  * GET route admin
//  */
 router.get('/awaitingApproval', (req, res) => {
    // GET route code here
    pool.query(`SELECT count(session.title) from session 
    WHERE session.awaiting_approval = $1`, [req.session.id])
    .then((results) =>
     res.send(results.rows))
     .catch((error) => {
         console.log('Error making GET request:', error);
         res.sendStatus(500);
     });
});


module.exports = router;