// Router for admin specific functions
const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const json2csv = require('json2csv').parse;
const User = require('../models/user.model.js');
const Session = require('../models/session.model.js');
const { Op } = Sequelize;

const {
    requireAdmin,
} = require('../modules/authentication-middleware');

const { logError } = require('./../modules/logger');

// GET route for all APPROVED submissions
router.get('/approved/sessions', requireAdmin, async (req, res) => {
    try {
        const userSessions = await Session.findAll({
            where: {
                status: 'approved',
            }
        });
        res.status(200).send(userSessions);
    } catch (e) {
        logError(e);
        res.sendStatus(500);
    }
});

// GET route for all PENDING submissions
router.get('/pending/sessions', requireAdmin, async (req, res) => {
    try {
        const userSessions = await Session.findAll({
            where: {
                status: 'pending',
            }
        });
        res.status(200).send(userSessions);
    } catch (e) {
        logError(e);
        res.sendStatus(500);
    }
});


// PUT route to add an admin
router.put('/user/promote/:id', requireAdmin, async (req, res) => {
    try {
        const userId = req.params.id;
        await User.update(
            {
                admin: true,
            },
            {
                where: {
                    id: userId,
                },
                // Return the updated record
                plain: true,
                returning: true,
            }
        );
        res.send(200);
    } catch (e) {
        logError(e);
        res.sendStatus(500);
    }
});

// PUT route to remove an admin.
router.put('/user/demote/:id', requireAdmin, async (req, res) => {
    try {
        const userId = req.params.id;
        await User.update(
            {
                admin: false,
            },
            {
                where: {
                    id: userId,
                },
                // Return the updated record
                plain: true,
                returning: true,
            }
        );
        res.send(200);
    } catch (e) {
        logError(e);
        res.sendStatus(500);
    }
});

// PUT route to approve a session
router.put('/approve/:id', requireAdmin, async (req, res) => {
    try {
        const sessionId = req.params.id;
        const session = await Session.update(
            {
                approved: true,
                awaiting_approval: false,
                status: 'approved',
            },
            {
                where: {
                    id: sessionId,
                },
                // Return the updated record
                plain: true,
                returning: true,
            }
        );
        res.status(200).send(session);
    } catch (e) {
        logError(e);
        res.sendStatus(500); 
    }
});

// PUT route to deny a session
router.put('/deny/:id', requireAdmin, async (req, res) => {
    try {
        const sessionId = req.params.id;
        await Session.update(
            {
                awaiting_approval: false,
                status: 'rejected',
            },
            {
                where: {
                    id: sessionId,
                },
                // Return the updated record
                plain: true,
                returning: true,
            }
        );
        res.send(200);
    } catch (e) {
        logError(e);
        res.sendStatus(500);
    }
});

router.delete('/delete/:id', requireAdmin, async (req, res) => {
    try {
        const sessionId = req.params.id;
        await Session.update(
            {
                awaiting_approval: false,
                status: 'deleted',
            },
            {
                where: {
                    id: sessionId,
                },
                // Return the updated record
                plain: true,
                returning: true,
            }
        );
        res.send(200);
    } catch (e) {
        logError(e);
        res.sendStatus(500);
    }
});

/**
 * GET route admin
 */
router.get('/user/list', requireAdmin, async (req, res) => {
    try {
        let userList = await User.findAll({
            attributes: [
                'id',
                'first_name',
                'last_name',
                'email',
                'admin',
            ],
            raw: true,
            order: [
                ['first_name', 'ASC'],
            ],
        });
        res.send(userList);
    } catch (error) {
        logError(error);
        res.send(500);
    }
});

/**
 * GET route admin
 */
router.get('/sessions/csv', requireAdmin, async (req, res) => {
    try {
        const userSessions = await Session.findAll({
            raw: true, // raw results required for json2csv
            where: {
                status: {
                    [Op.not]: 'deleted',
                },
            }
        });
        const csvString = json2csv(userSessions);
        res.setHeader('Content-disposition', 'attachment; filename=sessions.csv');
        res.set('Content-Type', 'text/csv');
        res.status(200).send(csvString);
    } catch (e) {
        console.log(e);
        logError(e);
        res.sendStatus(500);
    }
});

module.exports = router;