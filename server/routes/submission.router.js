const express = require('express');
const { pool } = require('../modules/pool');
const router = express.Router();
const Session = require('../models/session.model.js');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const S3Service = require('../services/S3Service');


// GET route for all APPROVED submissions
router.get('/approved', rejectUnauthenticated, (req, res) => {
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

// GET route for all user submissions
router.get('/user', rejectUnauthenticated, async (req, res) => {
    try {
        const userSessions = await Session.findAll({
            where: {
                user_id: req.user.id,
            }
        });
        res.status(200).send(userSessions);
    } catch (e) {
        console.log('error with post to db', e);
        res.sendStatus(500);
    }
})

const getIpAddress = (req) => {
    let result;
    if (process.env.NODE_ENV === 'development') {
        result = '127.0.0.1';
    } else if (req.connection && req.connection.remoteAddress) {
        result = req.connection.remoteAddress;
    } else if (req.headers) {
        result = req.headers['x-forwarded-for'];
    }
    return result;
};

//POST route for session submission form 
router.put('/', rejectUnauthenticated, async (req, res) => {
    try {
        const newSubmission = req.body;
        newSubmission.user_id = req.user.id;
        newSubmission.ip_address = getIpAddress(req);
        // TODO: These should be junction tables
        newSubmission.industry = JSON.stringify(newSubmission.industry);
        newSubmission.time = JSON.stringify(newSubmission.time);
        newSubmission.date = JSON.stringify(newSubmission.date);
        // END TODO
        const result = await Session.update(
            newSubmission,
            {
                where: { 
                    id: newSubmission.id,
                    user_id: req.user.id,
                },
                // Return the updated record
                plain: true,
                returning: true,
            }
        );
        res.status(201).send(result);
    } catch (e) {
        console.log('error with post to db', e);
        res.sendStatus(500);
    }
});

//POST route for session submission form 
router.post('/', rejectUnauthenticated, async (req, res) => {
    try {
        const newSubmission = req.body;
        newSubmission.user_id = req.user.id;
        newSubmission.ip_address = getIpAddress(req);
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
        // Create the parameters for calling listObjects

        // Upload resume to S3
        const s3 = S3Service.instance();
        await s3.upload({
            resourceId: Number(req.user.id),
            fileName: uploadProps.name,
            fileCategory: S3Service.FileCategories.Submissions,
            data: req.files.fileToUpload.data,
        });
        const url = s3.toUrl({
            resourceId: Number(req.user.id),
            fileName: uploadProps.name,
            fileCategory: S3Service.FileCategories.Submissions,
        });
        res.send({ message: 'success', imagePath: url });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});



module.exports = router;