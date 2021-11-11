const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', ( req, res ) => {
    let sessionId = req.session.id;

    const queryText = `SELECT * FROM "session"`;
    pool.query( queryText, [ sessionId ] )
    .then(( result ) => {
        res.send( result.rows )
    }).catch(( error ) => {
        console.log('error in getting panelist information', error);
        res.send(500);
    })
})

module.exports = router;