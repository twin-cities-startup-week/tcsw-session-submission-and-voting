const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Session = require('../models/session.model.js');
const UserVote = require('../models/user_vote.model.js');
const {
    rejectUnauthenticated,
    requireAdmin,
    getIpAddress,
} = require('../modules/authentication-middleware');
const S3Service = require('../services/S3Service');
const {
    sendSessionSubmissionEmail,
} = require('../modules/email');
const { Op } = Sequelize;
const { logError } = require('./../modules/logger');

// GET route for all APPROVED submissions
router.get('/approved', async (req, res) => {
    // console.log('Params', req.query);
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
        const tracks = decodeURIComponent(req.query.track).split(',');
        andConditions.push({
            track: {
                [Op.in]: tracks,
            }
        });
    }
    // console.log('WHERE', andConditions);
    if (andConditions.length > 0) {
        whereCondition[Op.and] = andConditions;
    }
    const include = [];
    // If we have a logged in user, include vote information for the session
    if (req.user && req.user.id) {
        include.push(
            {
                model: UserVote,
                required: false,
                attributes: [
                    ['created_at', 'voted_at'],
                    ['id', 'vote_id'],
                ],
                where: {
                    user_id: req.user.id,
                },
            },
        );
    }
    try {
        const userSessions = await Session.findAll({
            attributes: [
                'id',
                'title',
                'industry',
                'track',
                'speakers',
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
            include,
            where: whereCondition,
            limit: 200,
            order: [
                ['title', 'ASC'],
            ],
        });
        res.status(200).send(userSessions);
    } catch (e) {
        logError(e);
        res.sendStatus(500);
    }
});

// GET route for leaderboard returns top 10 sessions with the most votes
router.get('/leaderboard', requireAdmin, async (req, res) => {
    try {
        const userSessions = await Session.findAll({
            raw: true,
            attributes: [
                'id',
                'title',
                'industry',
                'track',
                'speakers',
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
                // [Sequelize.fn('COUNT', Sequelize.col('user_votes.id')), 'vote_count'],
            ],
            include: [{
                model: UserVote,
                duplicating: false,
                attributes: [],
            }],
            group: ['session.id'],
            where: {
                status: 'approved',
            },
            order: [
                [Sequelize.fn('COUNT', Sequelize.col('user_votes.id')), 'DESC'],
                ['title', 'ASC'],
            ],
            limit: 10,

        });
        res.status(200).send(userSessions);
    } catch (e) {
        logError(e);
        res.sendStatus(500);
    }
});

// GET route for public facing session details
router.get('/details/:id', async (req, res) => {
    try {
        let whereCondition = {
            // non-admins are only able to see approved sessions
            status: 'approved',
            id: req.params.id,
        };
        if (req.user && req.user.admin === true) {
            // Admins are able to see all sessions
            whereCondition = {
                id: req.params.id,
            };
        }
        const include = [];
        // If we have a logged in user, include vote information for the session
        if (req.user && req.user.id) {
            include.push(
                {
                    model: UserVote,
                    required: false,
                    attributes: [
                        ['created_at', 'voted_at'],
                        ['id', 'vote_id'],
                    ],
                    where: {
                        user_id: req.user.id,
                    },
                },
            );
        }
        
        // Limit columns for public viewing
        const userSession = await Session.findOne(
            {
                attributes: [
                    'id',
                    'title',
                    'industry',
                    'track',
                    'speakers',
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
                    'linkedin',
                ],
                include,
                where: whereCondition,
            }
        );
        if (userSession) {
            res.status(200).send(userSession);
        } else {
            res.sendStatus(404);
        }
        
    } catch (error) {
        logError(error);
        res.sendStatus(500);
    }
});

// GET route for all user submissions
router.get('/user', rejectUnauthenticated, async (req, res) => {
    try {
        const userSessions = await Session.findAll({
            attributes: {
                include: [[Sequelize.fn('COUNT', Sequelize.col('user_votes.id')), 'vote_count']]
            },
            include: [{
                model: UserVote,
                attributes: [],
            }],
            group: ['session.id'],
            where: {
                user_id: req.user.id,
                status: {
                    [Op.not]: 'deleted',
                },
            }
        });
        res.status(200).send(userSessions);
    } catch (e) {
        logError(e);
        res.sendStatus(500);
    }
})

// GET route for ALL submission details, used for editing
router.get('/user/:id', rejectUnauthenticated, async (req, res) => {
    try {
        const whereCondition = {
            status: {
                [Op.not]: 'deleted',
            },
            id: req.params.id,
        };
        // Admin users can access all submissions
        if (req.user.admin !== true) {
            whereCondition.user_id = req.user.id;
        }
        // Returns ALL submission details
        const userSession = await Session.findOne(
            {
                where: whereCondition,
            }
        );
        if(userSession === null) {
            res.sendStatus(404);
        } else {
            res.status(200).send(userSession);
        }
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

//PUT route for session voting 
router.put('/vote/:id', rejectUnauthenticated, async (req, res) => {
    try {
        // Use the logged in user id
        const userId = req.user.id;
        // Session id passed as a request param
        const sessionId = req.params.id;
        // Check for an existing vote, only one vote per session per user is allowed
        const userVote = await UserVote.findOne(
            {
                where: {
                    user_id: userId,
                    session_id: sessionId,
                },
            }
        );
        if (userVote) {
            // QUESTION: Should we allow users to 'undo' a vote?
            res.status(409).send({message: `You've already voted for this session.`});
        } else {
            const result = UserVote.create({
                user_id: userId,
                session_id: sessionId,
            },
            {
                returning: true,
                plain: true,
            })
            res.status(201).send(result);
        }
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