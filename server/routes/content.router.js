const express = require('express');
const { pool } = require('../modules/pool');
const router = express.Router();
const ContentBlock = require('../models/content_block.model.js');
const {
    requireAdmin,
} = require('../modules/authentication-middleware');



/**
 * GET route block
 */
router.get('/block', async (req, res) => {
    try {
        const contentResults = await ContentBlock.findAll();
        
        res.send(contentResults);
    } catch (e) {
        res.sendStatus(500);
    }
});

/**
 * POST route block
 */
router.post('/block', requireAdmin, async (req, res) => {
    // POST route code here
    try {
        const { content, name } = req.body;
        const updatedContent = await ContentBlock.update(
            {
                content,
            },
            {
                where: {
                    name,
                },
                // Return the updated record
                returning: true,
                plain: true,
            },
        );
        res.send(updatedContent);
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;