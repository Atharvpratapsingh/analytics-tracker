import { useEffect, useState } from 'react';
import { getAllPages, getHeatmapData } from '../services/api';

function Heatmap() {
    const [pages, setPages] = useState([]);
    const [selectedPage, setSelectedPage] = useState('');
    const [clicks, setClicks] = useState([]);

    useEffect(() => {
        getAllPages()
            .then(res => setPages(res.data.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (selectedPage) {
            getHeatmapData(selectedPage)
                .then(res => setClicks(res.data.data))
                .catch(err => console.error(err));
        }
    }, [selectedPage]);

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Click Heatmap</h2>

            <div className="bg-white p-4 rounded shadow mb-6">
                <label className="block text-sm font-semibold mb-2">
                    Select Page URL:
                </label>
                <select
                    value={selectedPage}
                    onChange={(e) => setSelectedPage(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="">-- Choose a page --</option>
                    {pages.map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
            </div>

            {selectedPage && (
                <div className="bg-white p-4 rounded shadow">
                    <p className="mb-4 text-gray-700">
                        Total clicks: <strong>{clicks.length}</strong>
                    </p>
                    <div
                        className="relative bg-slate-100 rounded border-2 border-dashed border-slate-300"
                        style={{ width: '100%', height: '600px', overflow: 'hidden' }}
                    >
                        {clicks.map((click, idx) => (
                            <div
                                key={idx}
                                className="absolute w-4 h-4 bg-red-500 rounded-full opacity-60"
                                style={{
                                    left: `${(click.clickX / 1920) * 100}%`,
                                    top: `${(click.clickY / 1080) * 100}%`,
                                    transform: 'translate(-50%, -50%)'
                                }}
                                title={`(${click.clickX}, ${click.clickY})`}
                            ></div>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Click positions normalized to 1920x1080 viewport
                    </p>
                </div>
            )}
        </div>
    );
}

export default Heatmap;