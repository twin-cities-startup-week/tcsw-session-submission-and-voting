const express = require('express');
const { pool } = require('../modules/pool');
const router = express.Router();
const User = require('../models/user.model.js');

const {
    requireAdmin,
} = require('../modules/authentication-middleware');

const { logError } = require('./../modules/logger');

/**
 * GET route admin
 */
 router.get('/', requireAdmin, (req, res) => {
    // GET route code here
    pool.query(`SELECT * from "session"`)
    .then((results) =>
     res.send(results.rows))
     .catch((error) => {
         logError(error);
         res.sendStatus(500);
     });
});

/**
 * GET route admin
//  */
router.get('/sessionsApproved', requireAdmin, (req, res) => {
    // GET route code here
    pool.query(`SELECT count(session.title) from "session" 
    WHERE "session"."status" = 'approved';`)
    .then((results) => {
        res.send(results.rows)
    })
     .catch((error) => {
         logError(error);
         res.sendStatus(500);
     });
});



/**
 * GET route admin
//  */
router.get('/sessionsVotes', requireAdmin, (req, res) => {
    // GET route code here
    pool.query(`SELECT title, votes FROM session
    ORDER BY "votes" DESC LIMIT 1;
    `)
    .then((results) =>
        res.send(results.rows))
    .catch((error) => {
        logError(error);
        res.sendStatus(500);
    });
});

// /**
//  * GET route admin
// //  */
router.get('/awaitingApproval', requireAdmin, (req, res) => {
    // GET route code here
    pool.query(`SELECT count(session.id) from "session"
    WHERE "session"."status" = 'pending';
    `)
    .then((results) =>
     res.send(results.rows))
     .catch((error) => {
         logError(error);
         res.sendStatus(500);
     });
});

/**
 * GET route admin
 */
 router.get('/awaitingApprovalList', requireAdmin, (req, res) => {
    // GET route code here
    pool.query(`SELECT * from "session" 
    WHERE "session"."status" = 'pending';`)
    .then((results) =>
     res.send(results.rows))
     .catch((error) => {
         logError(error);
         res.sendStatus(500);
     });
});

/**
 * GET route admin
 */
 router.get('/approvedList', requireAdmin, (req, res) => {
    // GET route code here
    pool.query(`SELECT * from "session" WHERE "session"."status" = 'approved';`)
    .then((results) =>
        res.send(results.rows))
    .catch((error) => {
        logError(error);
        res.sendStatus(500);
    });
});

router.put('/approve/:id', requireAdmin, (req, res) => {
    const sessionId = req.params.id;

    const queryText = `UPDATE "session"
                        SET "approved" = true, "awaiting_approval" = false, "status" = 'approved'
                        WHERE "id" = $1;`

    pool.query(queryText, [sessionId])
        .then(result => {
            res.send(200)
        }).catch(error => {
            logError(error);
            res.send(500)
        })
});

router.put('/deny/:id', requireAdmin, (req, res) => {
    const sessionId = req.params.id;

    const queryText = `UPDATE "session"
                        SET "awaiting_approval" = false, "status" = 'rejected'
                        WHERE "id" = $1;`

    pool.query(queryText, [sessionId])
        .then(result => {
            res.send(200)
        }).catch(error => {
            logError(error);
            res.send(500)
        })
});

router.delete('/delete/:id', requireAdmin, (req, res) => {
    const sessionId = req.params.id;

    const queryText = `UPDATE "session"
                        SET "awaiting_approval" = false, "status" = 'deleted'
                        WHERE "id" = $1;`

    pool.query(queryText, [sessionId])
        .then(result => {
            res.send(200)
        }).catch(error => {
            logError(error);
            res.send(500)
        })
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

module.exports = router;