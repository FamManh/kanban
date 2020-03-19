const express = require('express');

const authRoutes = require('./auth/route');
const boardRoutes = require('./board/route')
const columnRoutes = require("./column/route");
const taskRoutes = require("./task/route");

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res)=> res.send('OK'))

/**
 * GET v1 docs
 */
router.use('/docs', express.static('docs'));

router.use('/auth', authRoutes);
router.use("/board", boardRoutes);
router.use("/column", columnRoutes);
router.use("/task", taskRoutes);

module.exports = router;
