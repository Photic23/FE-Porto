// Enhanced SpotifyPlayer.js with better error handling and auth flow
import React, { useState, useEffect, useCallback } from 'react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://be-photic23.vercel.app';

function SpotifyPlayer() {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [needsAuth, setNeedsAuth] = useState(false);

    const fetchCurrentTrack = useCallback(async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/current-track`);
            const data = await response.json();
            
            // Check if we need to re-authenticate
            if (data?.needsNewToken) {
                setNeedsAuth(true);
                setError(data.details || 'Please re-authenticate with Spotify');
                setCurrentTrack(null);
                return;
            }
            
            // Check for other errors
            if (data?.error) {
                setError(data.details || data.error);
                setCurrentTrack(null);
                return;
            }
            
            // Successfully got track data (or null if nothing playing)
            setCurrentTrack(data);
            setError(null);
            setNeedsAuth(false);
        } catch (error) {
            console.error('Error fetching current track:', error);
            setError('Failed to connect to backend');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Fetch immediately
        fetchCurrentTrack();
        
        // Poll every 5 seconds
        const interval = setInterval(fetchCurrentTrack, 5000);
        
        return () => clearInterval(interval);
    }, [fetchCurrentTrack]);

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                Loading Spotify...
            </div>
        );
    }

    // Authentication needed state
    if (needsAuth) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm text-red-700">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Authentication needed</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                    The Spotify refresh token has expired. Please contact the site admin to re-authenticate.
                </p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex items-center gap-2 text-sm text-red-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
                <button 
                    onClick={() => {
                        setError(null);
                        setLoading(true);
                        fetchCurrentTrack();
                    }}
                    className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                    Retry
                </button>
            </div>
        );
    }

    // Track playing state
    if (currentTrack) {
        const progress = currentTrack.progress_ms && currentTrack.duration_ms
            ? (currentTrack.progress_ms / currentTrack.duration_ms) * 100
            : 0;

        return (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 shadow-sm">
                <div className="flex items-start gap-4">
                    {currentTrack.image && (
                        <img 
                            src={currentTrack.image} 
                            alt={currentTrack.name}
                            className="w-20 h-20 rounded-lg shadow-md object-cover"
                        />
                    )}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-gray-900 truncate">
                            {currentTrack.name}
                        </h3>
                        <p className="text-sm text-gray-700 truncate">
                            {currentTrack.artists?.join(', ')}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-1">
                            {currentTrack.album}
                        </p>
                        {progress > 0 && (
                            <div className="mt-3 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                <div 
                                    className="bg-green-500 h-full transition-all duration-500 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        )}
                    </div>
                    {currentTrack.external_urls?.spotify && (
                        <a 
                            href={currentTrack.external_urls.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-700 transition-colors"
                            title="Open in Spotify"
                        >
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        );
    }

    // Nothing playing state
    return (
        <div className="flex items-center gap-3 text-gray-500 py-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <div>
                <p className="text-sm font-medium">No music playing</p>
            </div>
        </div>
    );
}

export default SpotifyPlayer;