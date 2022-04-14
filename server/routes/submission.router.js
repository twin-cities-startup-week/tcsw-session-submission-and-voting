const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Session = require('../models/session.model.js');
const {
    rejectUnauthenticated,
    getIpAddress,
} = require('../modules/authentication-middleware');
const S3Service = require('../services/S3Service');
const {
    sendSessionSubmissionEmail,
} = require('../modules/email');
const { Op } = Sequelize;
const { logError } = require('./../modules/logger');

// GET route for all APPROVED submissions
router.get('/approved', rejectUnauthenticated, async (req, res) => {
    console.log('Params', req.query);
    const whereCondition = {
        status: 'approved',
    }
    const andConditions = [];
    if (req.query.searchTerm && req.query.searchTerm !== '') {
        andConditions.push({
            [Op.or]: [
                {
                    description: {
                        [Op.iLike]: `%${req.query.searchTerm.trim()}%`,
                    },
                }, {
                    title: {
                        [Op.iLike]: `%${req.query.searchTerm.trim()}%`,
                    },
                },
            ],
        });
    }
    if (req.query.format && req.query.format !== '') {
        const orConditions = [];
        const formats = decodeURIComponent(req.query.format).split(',');
        andConditions.push({
            format: {
                [Op.in]: formats,
            },
        })
    }
    if (req.query.track && req.query.track !== '') {
        andConditions.push({
            track: {
                [Op.iLike]: req.query.track,
            }
        });
    }
    console.log('WHERE', andConditions);
    if (andConditions.length > 0) {
        whereCondition[Op.and] = andConditions;
    }
    try {
        const userSessions = await Session.findAll({
            where: whereCondition,
            limit: 50,
        });
        res.status(200).send(userSessions);
    } catch (e) {
        logError(e);
        res.sendStatus(500);
    }
});

router.get('/details/:id', async (req, res) => {
    try {
        let whereCondition = {
            // non-admins are only able to see approved sessions
            status: 'approved',
        };
        if (req.user && req.user.admin === true) {
            // Admins are able to see all sessions
            whereCondition = {};
        }
        
        // Limit columns for public viewing
        const userSession = await Session.findByPk(
            req.params.id,
            {
                attributes: [
                    'id',
                    'title',
                    'industry',
                    'track',
                    'speakers',
                    'purpose',
                    'location',
                    'location_details',
                    'time',
                    'date',
                    'host',
                    'description',
                    'attendees',
                    'length',
                    'area_of_interest',
                    'media',
                    'image',
                    'format',
                ],
                where: whereCondition,
            }
        );
        res.status(200).send(userSession);
    } catch (error) {
        logError(error);
        res.sendStatus(500);
    }
});

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
        logError(e);
        res.sendStatus(500);
    }
})

// GET route for submission detail, used for editing
router.get('/user/:id', rejectUnauthenticated, async (req, res) => {
    try {
        const whereCondition = {
            status: {
                [Op.not]: 'deleted',
            },
        };
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
        logError(e);
        res.sendStatus(500);
    }
});

//PUT route for session submission form 
router.put('/', rejectUnauthenticated, async (req, res) => {
    try {
        const newSubmission = req.body;
        const whereCondition = {
            id: newSubmission.id,
        }
        if (req.user.admin !== true) {
            newSubmission.user_id = req.user.id;
            whereCondition.user_id = req.user.id;
            // If a user edits their session, it goes back to pending
            newSubmission.status = 'pending';
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
        res.status(201).send(result);
    } catch (e) {
        logError(e);
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
        sendSessionSubmissionEmail(newSubmission.email, req.user.first_name, newSubmission);
        res.status(201).send(result);
    } catch (e) {
        logError(e);
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
        logError(error);
        res.sendStatus(500);
    }
});



module.exports = router;