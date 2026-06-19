const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {
        sessionId: {
            type: String,
            required: true,
            index: true
        },
        eventType: {
            type: String,
            enum: ['page_view', 'click'],
            required: true
        },
        pageUrl: {
            type: String,
            required: true,
            index: true
        },
        timestamp: {
            type: Date,
            required: true
        },
        clickX: {
            type: Number,
            default: null
        },
        clickY: {
            type: Number,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Event', eventSchema);