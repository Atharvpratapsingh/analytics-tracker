const express = require('express');
const router = express.Router();
const {
    createEvent,
    getSessions,
    getSessionEvents,
    getHeatmapData,
    getAllPages
} = require('../controllers/eventController');

router.post('/events', createEvent);
router.get('/sessions', getSessions);
router.get('/sessions/:sessionId/events', getSessionEvents);
router.get('/heatmap', getHeatmapData);
router.get('/pages', getAllPages);

module.exports = router;