const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // GET route code here
});

// GET route for all APPROVED submissions
router.get('/approved', (req, res) => {
    const queryText = `
        SELECT * FROM "session"
        WHERE "approved" = TRUE;`;
        
    pool.query (queryText)
    .then(result => {
        res.send(result.rows)
    }).catch(error => {
        console.log('Error in GET approved submissions, ', error)
    })
})

//POST route for session submission form - WORKING on postman
router.post('/', (req, res) => {
    const newSubmission = req.body;
    console.log('The new rec is', newSubmission);
    const queryText = `INSERT INTO "session" ("title", "email", "phone", "user_id","industry_id",
    "track_id", "rehersal", "covid", "speakers", "diversity", "purpose_id", 
    "location_id", "location_details", "time_id", "date_id", "host", 
    "description", "attendees", "length", "format_id", "area_of_interest_id", 
    "media", "image", "success", "excited", "other_hosts", "other_info" ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
        $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)`
    pool.query(queryText,
        [newSubmission.title,
        newSubmission.email,
        newSubmission.phone,
        newSubmission.user,
        newSubmission.industry,
        newSubmission.track,
        newSubmission.rehersal,
        newSubmission.covid,
        newSubmission.speakers,
        newSubmission.diversity,
        newSubmission.purpose,
        newSubmission.location,
        newSubmission.location_details,
        newSubmission.time,
        newSubmission.date,
        newSubmission.host,
        newSubmission.description,
        newSubmission.attendees,
        newSubmission.length,
        newSubmission.format,
        newSubmission.area_of_interest,
        newSubmission.media,
        newSubmission.image,
        newSubmission.sucess,
        newSubmission.excited,
        newSubmission.other_hosts,
        newSubmission.other_info,
        ]).then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('error with post to db', error);
            res.sendStatus(500);
        })
});

module.exports = router;