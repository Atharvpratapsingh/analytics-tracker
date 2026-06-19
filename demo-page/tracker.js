// ANALYTICS TRACKER SCRIPT
// Tracks page views and clicks, sends events to backend

(function() {

    // Configuration
    const API_URL = 'http://localhost:5000/api/events';//Backend ka address (where event send)
    const SESSION_KEY = 'analytics_session_id';

    // 1. Generate unique session ID
    function generateSessionId() {
        return 'session-' + Date.now() + '-' + Math.random().toString(36).substring(2, 11);
    }

    // 2. Get or create session ID (stored in localStorage)
    function getSessionId() {
        let sessionId = localStorage.getItem(SESSION_KEY);
        if (!sessionId) {
            sessionId = generateSessionId();
            localStorage.setItem(SESSION_KEY, sessionId);
        }
        return sessionId;
    }

    // 3. Send event data to backend
    function sendEvent(eventData) {
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData)
        })
        .then(res => res.json())
        .then(data => console.log('✅ Sent:', data))
        .catch(err => console.error('❌ Error:', err));
    }

    // 4. Track an event
    function trackEvent(eventType, extraData = {}) {
        const event = {
            sessionId: getSessionId(),
            eventType: eventType,
            pageUrl: window.location.href,
            timestamp: new Date().toISOString(),
            ...extraData
        };
        console.log('📡 Tracked:', event);
        sendEvent(event);
    }

    // 5. Track page view when page loads
    window.addEventListener('load', function() {
        trackEvent('page_view');
    });

    // 6. Track clicks anywhere on the page
    document.addEventListener('click', function(e) {
        trackEvent('click', {
            clickX: e.clientX,
            clickY: e.clientY
        });
    });

    console.log('🚀 Tracker initialized');

})();