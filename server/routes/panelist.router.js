const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', ( req, res ) => {
    const queryText = `SELECT * FROM "session";`;

    pool.query( queryText )
    .then(( result ) => {
        res.send( result.rows )
    }).catch(( error ) => {
        console.log('error in getting panelist information', error);
        res.send(500);
    })
})

router.get('/details/:id', ( req, res ) => {
    const queryText = 'SELECT * FROM "session" WHERE "id" = $1';
    
    pool.query( queryText, [ req.params.id  ] )
    .then(( result ) => {
        res.send( result.rows )
    }).catch(( error ) => {
        console.log('error in router get panel details', error );
        res.send(500)
    })
})

module.exports = router;