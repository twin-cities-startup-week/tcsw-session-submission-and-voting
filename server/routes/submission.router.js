const express = require('express');
const { pool } = require('../modules/pool');
const router = express.Router();
const Session = require('../models/session.model.js');
const {
    rejectUnauthenticated,
    getIpAddress,
} = require('../modules/authentication-middleware');
const S3Service = require('../services/S3Service');
const sgMail = require('@sendgrid/mail');

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

// GET route for submission detail, used for editing
router.get('/user/:id', rejectUnauthenticated, async (req, res) => {
    try {
        const whereCondition = {};
        // Admin users can access all submissions
        if (req.user.admin !== true) {
            whereCondition.user_id = req.user.id;
        }
        const userSession = await Session.findByPk(
            req.params.id,
            {
                where: whereCondition,
            }
        );
        res.status(200).send(userSession);
    } catch (e) {
        console.log('error with post to db', e);
        res.sendStatus(500);
    }
});

//POST route for session submission form 
router.put('/', rejectUnauthenticated, async (req, res) => {
    try {
        const newSubmission = req.body;
        const whereCondition = {
            id: newSubmission.id,
        }
        if (req.user.admin !== true) {
            newSubmission.user_id = req.user.id;
            whereCondition.user_id = req.user.id;
        }
        newSubmission.ip_address = getIpAddress(req);
        // TODO: These should be junction tables
        if (Array.isArray(newSubmission.industry)) {
            newSubmission.industry = JSON.stringify(newSubmission.industry);
        }
        if (Array.isArray(newSubmission.time)) {
            newSubmission.time = JSON.stringify(newSubmission.time);
        }
        if (Array.isArray(newSubmission.date)) {
            newSubmission.date = JSON.stringify(newSubmission.date);
        }
        // END TODO
        const result = await Session.update(
            newSubmission,
            {
                where: whereCondition,
                // Return the updated record
                plain: true,
                returning: true,
            }
        );
        if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY !== '') {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: req.user.email,
                from: process.env.SENDGRID_FROM_ADDRESS,
                subject: 'TCSW - Thank you for your submission',
                text: `
Title: ${newSubmission.title}
Description: ${newSubmission.description}

View your submission details here: https://sessions.twincitiesstartupweek.com/#/user/submission
`,
                html: `
<strong>Title</strong>
<br />
${newSubmission.title}
<br />
<br />
<strong>Description</strong>
<br />
${newSubmission.description}
<br />
<br />
<a href="https://sessions.twincitiesstartupweek.com/#/user/submission">Edit Submission</a>
`,
            };
            sgMail.send(msg).catch(e => console.log(e));
        } else {
            console.error('Missing SendGrid environment variables.')
        }
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
        const result = await Session.create(
            newSubmission,
            {
                returning: true,
                plain: true,
            }
        );
        if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY !== '') {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: req.user.email,
                from: process.env.SENDGRID_FROM_ADDRESS,
                subject: 'TCSW - Thank you for your submission',
                text: `
Title: ${newSubmission.title}
Description: ${newSubmission.description}

View your submission details here: https://sessions.twincitiesstartupweek.com/#/user/submission
`,
                html: `
<strong>Title</strong>
<br />
${newSubmission.title}
<br />
<br />
<strong>Description</strong>
<br />
${newSubmission.description}
<br />
<br />
<a href="https://sessions.twincitiesstartupweek.com/#/user/submission">Edit Submission</a>
`,
            };
            sgMail.send(msg).catch(e => console.log(e));
        } else {
            console.error('Missing SendGrid environment variables.')
        }
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