const express = require('express');
const { pool } = require('../modules/pool');
const router = express.Router();
const Session = require('../models/session.model.js');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET route for all APPROVED submissions
router.get('/approved', (req, res) => {
    const queryText = `
        SELECT * FROM "session"
        WHERE "approved" = TRUE
        ORDER BY "votes" DESC;`;
        
    pool.query (queryText)
    .then(result => {
        res.send(result.rows)
    }).catch(error => {
        console.log('Error in GET approved submissions, ', error)
    })
})

//POST route for session submission form 
router.post('/', rejectUnauthenticated, async (req, res) => {
    try {
        const newSubmission = req.body;
        newSubmission.user_id = req.user.id;
        // TODO: These should be junction tables
        newSubmission.industry = JSON.stringify(newSubmission.industry);
        newSubmission.time = JSON.stringify(newSubmission.time);
        newSubmission.date = JSON.stringify(newSubmission.date);
        // END TODO
        const result = await Session.create(newSubmission);
        res.status(201).send(result);
    } catch (e) {
        console.log('error with post to db', e);
        res.sendStatus(500);
    }
});



module.exports = router;