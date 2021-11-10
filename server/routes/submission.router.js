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

router.post('/', rejectUnauthenticated, (req, res) => {
    const newSubmission = req.body;
    console.log('The new rec is', newSubmission);
    const queryText = `INSERT INTO "session" ("title", "email", "phone", "user_id","industry_id",
    "track_id", "rehersal", "covid", "speakers", "diversity", "purpose_id", 
    "location_id", "location_details", "time_id", "date_id", "votes", "host", 
    "description", "attendees", "length", "format_id", "area_of_interest_id", 
    "media", "image", "success", "excited", "other_hosts", "other_info", 
    "awaiting_approval", "approved") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
        $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30)`
        pool.query(queryText,) //need to add req.body info here as well
            .then(result => {
                res.sendStatus(201);
            }).catch(error => {
                console.log('error with post to db', error);
                res.sendStatus(500);
            })

});

module.exports = router;