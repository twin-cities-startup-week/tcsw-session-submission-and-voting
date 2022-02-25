const express = require('express');
const { pool } = require('../modules/pool');
const router = express.Router();
const Session = require('../models/session.model.js');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const S3Service = require('../services/S3Service');


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

//POST route for session submission form 
router.post('/image', rejectUnauthenticated, async (req, res) => {
    try {
        const uploadProps = req.query;

        // Upload resume to S3
        const s3 = S3Service.instance();
        await s3.upload({
            resourceId: req.user.id,
            fileName: uploadProps.name,
            fileCategory: S3Service.FileCategories.Submissions,
            data: req.files.courseWork.data,
        });

        // Send back s3 response
        // { Location, ETag, Bucket, Key }
        // res.send(uploadCW);
        res.send('done');
    } catch (error) {
        logError(error);
        res.sendStatus(500);
    }
});



module.exports = router;