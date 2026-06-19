const Event = require('../models/Event');

// 1. POST /api/events
// Save event from tracker
exports.createEvent = async (req, res) => {//1. createEvent → Save new event in MongoDB

    try {
        const { sessionId, eventType, pageUrl, timestamp, clickX, clickY } = req.body;

        if (!sessionId || !eventType || !pageUrl || !timestamp) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const event = await Event.create({
            sessionId,
            eventType,
            pageUrl,
            timestamp,
            clickX: clickX || null,
            clickY: clickY || null
        });

        res.status(201).json({
            success: true,
            message: 'Event tracked successfully',
            data: event
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// 2. GET /api/sessions
// Get all sessions with event counts
exports.getSessions = async (req, res) => {//getSessions → Get all sessions with event counts
    try {
        const events = await Event.find();

        const sessionMap = {};
        events.forEach(event => {
            if (!sessionMap[event.sessionId]) {
                sessionMap[event.sessionId] = {
                    sessionId: event.sessionId,
                    totalEvents: 0,
                    lastSeen: event.timestamp
                };
            }
            sessionMap[event.sessionId].totalEvents++;
            if (event.timestamp > sessionMap[event.sessionId].lastSeen) {
                sessionMap[event.sessionId].lastSeen = event.timestamp;
            }
        });

        const sessions = Object.values(sessionMap);

        res.json({
            success: true,
            data: sessions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// 3. GET /api/sessions/:sessionId/events
// Get all events for a specific session
exports.getSessionEvents = async (req, res) => {//getSessionEvents  → Get all events of one session (user journey)

    try {
        const events = await Event.find({ sessionId: req.params.sessionId })
            .sort({ timestamp: 1 });

        res.json({
            success: true,
            data: events
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// 4. GET /api/heatmap?pageUrl=...
// Get clicks for a specific page (for heatmap)
exports.getHeatmapData = async (req, res) => { //getHeatmapData  → Get all click coordinates for one page
    try {
        const clicks = await Event.find({
            pageUrl: req.query.pageUrl,
            eventType: 'click'
        });

        res.json({
            success: true,
            data: clicks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// 5. GET /api/pages
// Get all unique page URLs (helper for frontend dropdown)
exports.getAllPages = async (req, res) => {//getAllPages  → Get list of all unique page URLs
    try {
        const pages = await Event.distinct('pageUrl');

        res.json({
            success: true,
            data: pages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};