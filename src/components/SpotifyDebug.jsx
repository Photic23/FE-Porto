// Debug component to test Spotify connection
import React, { useState, useEffect } from 'react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://be-photic23.vercel.app';

function SpotifyDebug() {
    const [debugInfo, setDebugInfo] = useState(null);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDebugInfo = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BACKEND_URL}/api/debug-spotify`);
            const data = await response.json();
            setDebugInfo(data);
        } catch (error) {
            setDebugInfo({ error: error.message });
        }
        setLoading(false);
    };

    const fetchCurrentTrack = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/current-track`);
            const data = await response.json();
            setCurrentTrack(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchDebugInfo();
        fetchCurrentTrack();
        
        // Poll every 5 seconds
        const interval = setInterval(() => {
            fetchCurrentTrack();
            fetchDebugInfo();
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-4 space-y-4">
            <div className="bg-gray-100 p-4 rounded">
                <h3 className="font-bold mb-2">Debug Info</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : debugInfo ? (
                    <pre className="text-xs overflow-auto">
                        {JSON.stringify(debugInfo, null, 2)}
                    </pre>
                ) : (
                    <p>No debug info</p>
                )}
                <button 
                    onClick={fetchDebugInfo}
                    className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
                >
                    Refresh Debug Info
                </button>
            </div>

            <div className="bg-green-100 p-4 rounded">
                <h3 className="font-bold mb-2">Current Track</h3>
                {currentTrack ? (
                    <div>
                        <p><strong>Track:</strong> {currentTrack.name}</p>
                        <p><strong>Artist:</strong> {currentTrack.artists?.[0]?.name}</p>
                        <p><strong>Album:</strong> {currentTrack.album?.name}</p>
                    </div>
                ) : (
                    <p>No track playing</p>
                )}
            </div>

            <div className="text-sm text-gray-600">
                <p>Last updated: {new Date().toLocaleTimeString()}</p>
            </div>
        </div>
    );
}

export default SpotifyDebug;