const express = require('express');
const { pool } = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//GET route to fetch user id for submission form
// router.get('/userId', (req, res) => {
//     const queryText = `SELECT * from "user"
//     JOIN "session" ON "user"."id"="session"."user_id"
//     WHERE "user"."id" = $1;`;
//     pool.query(queryText)
//     .then(result => {
//         res.send(result.rows);
//     }).catch (error => {
//         console.log('Error with GET of user id', error );
//     })
// });

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
router.post('/', rejectUnauthenticated, (req, res) => {
    const newSubmission = req.body;
    console.log('The new rec is', newSubmission);
    const queryText = `INSERT INTO "session" ("title", "email", "phone", "user_id","industry",
    "track", "covid", "speakers", "diversity", "purpose", 
    "location", "location_details", "time", "date", "votes", "host", 
    "description", "attendees", "length", "format", "area_of_interest", 
    "media", "success", "excited", "other_hosts", "other_info" ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
        $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)`
    pool.query(queryText,
        [newSubmission.title,
        newSubmission.email,
        newSubmission.phone,
        req.user.id,
        newSubmission.industry,
        newSubmission.track,
        newSubmission.covid,
        newSubmission.speakers,
        newSubmission.diversity,
        newSubmission.purpose,
        newSubmission.location,
        newSubmission.location_details,
        newSubmission.time,
        newSubmission.date,
        newSubmission.votes,
        newSubmission.host,
        newSubmission.description,
        newSubmission.attendees,
        newSubmission.length,
        newSubmission.format,
        newSubmission.area_of_interest,
        newSubmission.media,
        newSubmission.success,
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