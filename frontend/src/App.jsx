import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SessionDetail from './pages/SessionDetail';
import Heatmap from './pages/Heatmap';

function App() {
    return (
        <BrowserRouter>
            <nav className="bg-slate-800 text-white px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">📊 Analytics Dashboard</h1>
                <div className="space-x-6">
                    <Link to="/" className="hover:text-blue-300">Sessions</Link>
                    <Link to="/heatmap" className="hover:text-blue-300">Heatmap</Link>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/session/:sessionId" element={<SessionDetail />} />
                <Route path="/heatmap" element={<Heatmap />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;