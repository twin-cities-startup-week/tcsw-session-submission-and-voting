const express = require('express');
const { pool } = require('../modules/pool');
const router = express.Router();
const Session = require('../models/session.model.js');
const {
    rejectUnauthenticated,
    requireAdmin,
} = require('../modules/authentication-middleware');

router.get('/', ( req, res ) => {
    const queryText = `SELECT * FROM "session"
                        WHERE "session"."approved" = true;`;

    pool.query( queryText )
    .then(( result ) => {
        res.send( result.rows )
    }).catch(( error ) => {
        console.log('error in getting panelist information', error);
        res.send(500);
    })
})

router.get('/details/:id', async ( req, res ) => {
    try {
        const userSession = await Session.findByPk(
            req.params.id,
        );
        res.status(200).send(userSession);
    } catch (error) {
        console.log('error in router get panel details', error);
        res.sendStatus(500);
    }
})

router.put('/vote/:id', rejectUnauthenticated, ( req, res ) => {
    const sessionId = req.params.id;

    const queryText = `UPDATE "session"
                        SET "votes" = "votes" + 1
                        WHERE "id" = $1;`;

    pool.query( queryText, [ sessionId ])
    .then( result => {
        res.send(200)
    }).catch ( error => {
        res.send(500)
    })
})

router.put('/approve/:id', requireAdmin, ( req, res ) => {
    const sessionId = req.params.id;

    const queryText = `UPDATE "session"
                        SET "approved" = true, "awaiting_approval" = false
                        WHERE "id" = $1;`
    
    pool.query( queryText, [ sessionId ])
    .then( result => {
        res.send(200)
    }).catch ( error => {
        res.send(500)
    })
})

router.put('/deny/:id', requireAdmin, ( req, res ) => {
    const sessionId = req.params.id;

    const queryText = `UPDATE "session"
                        SET "awaiting_approval" = false
                        WHERE "id" = $1;`
    
    pool.query( queryText, [ sessionId ])
    .then( result => {
        res.send(200)
    }).catch ( error => {
        res.send(500)
    })
})

// `SELECT *, "user"."first_name", "user"."last_name" FROM "session"
//                         JOIN "user" 
//                         ON "session"."user_id" = "user"."id";`


// `SELECT *, "user"."first_name", "user"."last_name" FROM "session"
//                         JOIN "user" 
//                         ON "session"."user_id" = "user"."id"
//                         WHERE "session"."id" = $1;`
module.exports = router;