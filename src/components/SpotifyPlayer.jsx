// Simplified SpotifyPlayer component
import React, { useState, useEffect } from 'react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://be-photic23.vercel.app';

function SpotifyPlayer() {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Start polling for current track
        fetchPublicTrack();
        const interval = setInterval(fetchPublicTrack, 5000);
        
        return () => clearInterval(interval);
    }, []);

    const fetchPublicTrack = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/current-track`);
            
            if (response.ok) {
                const data = await response.json();
                setCurrentTrack(data);
                setError(null);
            }
        } catch (error) {
            console.error('Error fetching current track:', error);
            setError('Failed to connect to backend');
        }
    };

    if (error) {
        return (
            <div className="text-sm text-red-600">
                {error}
                <button 
                    onClick={() => {
                        setError(null);
                        fetchPublicTrack();
                    }}
                    className="ml-2 text-blue-600 hover:underline"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (currentTrack) {
        return (
            <div className="flex items-center gap-3 bg-black/10 p-3 rounded-lg">
                {currentTrack.album?.images?.[0] && (
                    <img 
                        src={currentTrack.album.images[0].url} 
                        alt={currentTrack.name}
                        className="w-16 h-16 rounded-md shadow-md"
                    />
                )}
                <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-medium text-base truncate">
                        {currentTrack.name || 'Unknown Track'}
                    </span>
                    <span className="text-sm text-gray-600 truncate">
                        {currentTrack.artists?.map(artist => artist.name).join(', ') || 'Unknown Artist'}
                    </span>
                    {currentTrack.album?.name && (
                        <span className="text-xs text-gray-500 truncate">
                            {currentTrack.album.name}
                        </span>
                    )}
                </div>
                {currentTrack.external_urls?.spotify && (
                    <a 
                        href={currentTrack.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                    </a>
                )}
            </div>
        );
    }

    return (
        <div className="text-sm text-gray-600">
            Nothing playing right now
        </div>
    );
}

export default SpotifyPlayer;