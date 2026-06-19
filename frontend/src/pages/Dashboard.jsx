import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSessions } from '../services/api';

function Dashboard() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSessions()
            .then(res => setSessions(res.data.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">
                All Sessions ({sessions.length})
            </h2>

            {sessions.length === 0 ? (
                <div className="bg-white p-6 rounded shadow text-center text-gray-500">
                    No sessions yet. Open the demo page to generate data.
                </div>
            ) : (
                <div className="bg-white rounded shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="px-4 py-3 text-left">Session ID</th>
                                <th className="px-4 py-3 text-left">Total Events</th>
                                <th className="px-4 py-3 text-left">Last Activity</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessions.map(s => (
                                <tr key={s.sessionId} className="border-t hover:bg-slate-50">
                                    <td className="px-4 py-3 font-mono text-sm">
                                        {s.sessionId.substring(0, 30)}...
                                    </td>
                                    <td className="px-4 py-3">{s.totalEvents}</td>
                                    <td className="px-4 py-3 text-sm">
                                        {new Date(s.lastSeen).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Link 
                                            to={`/session/${s.sessionId}`} 
                                            className="text-blue-600 hover:underline"
                                        >
                                            View Journey →
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Dashboard;