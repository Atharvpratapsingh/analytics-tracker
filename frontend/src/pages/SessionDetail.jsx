import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSessionEvents } from '../services/api';

function SessionDetail() {
    const { sessionId } = useParams();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSessionEvents(sessionId)
            .then(res => setEvents(res.data.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [sessionId]);

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
                ← Back to Sessions
            </Link>

            <h2 className="text-2xl font-bold mb-2">User Journey</h2>
            <p className="text-gray-600 mb-6 font-mono text-sm">{sessionId}</p>

            {events.length === 0 ? (
                <div className="bg-white p-6 rounded shadow text-center text-gray-500">
                    No events found for this session.
                </div>
            ) : (
                <div className="space-y-3">
                    {events.map((event, idx) => (
                        <div key={event._id} className="bg-white p-4 rounded shadow flex items-center gap-4">
                            <div className="bg-blue-100 text-blue-700 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                                {idx + 1}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                        event.eventType === 'page_view' 
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-purple-100 text-purple-700'
                                    }`}>
                                        {event.eventType === 'page_view' ? '📄 Page View' : '🖱️ Click'}
                                    </span>
                                    <span className="text-gray-500 text-sm">
                                        {new Date(event.timestamp).toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-700 truncate">{event.pageUrl}</p>
                                {event.clickX !== null && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        Coordinates: ({event.clickX}, {event.clickY})
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SessionDetail;