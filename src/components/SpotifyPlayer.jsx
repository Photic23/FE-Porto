import React, { useState, useEffect } from 'react';

const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.NODE_ENV === 'production' 
    ? 'https://photic23.vercel.app/'
    : 'http://localhost:3000/';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

// PKCE helper functions
function generateRandomString(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

function SpotifyPlayer() {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user is authorized on backend
    useEffect(() => {
        checkAuthStatus();
        
        // Start polling for current track regardless of auth status
        fetchPublicTrack();
        const interval = setInterval(fetchPublicTrack, 5000);
        
        return () => clearInterval(interval);
    }, []);

    // Fetch the currently playing track from your backend
    const fetchPublicTrack = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/current-track`);
            if (response.ok) {
                const data = await response.json();
                setCurrentTrack(data);
                setError(null);
            } else {
                console.error('Failed to fetch track:', response.status);
            }
        } catch (error) {
            console.error('Error fetching current track:', error);
            setError('Failed to connect to backend');
        }
    };

    // Check if user is authorized on the backend
    const checkAuthStatus = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${BACKEND_URL}/api/auth-status`, {
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setIsAuthorized(data.authorized);
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            setError('Failed to check authorization status');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle OAuth callback
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        
        if (code) {
            const codeVerifier = localStorage.getItem('code_verifier');
            
            const sendTokenToBackend = async () => {
                try {
                    const response = await fetch(`${BACKEND_URL}/api/auth/callback`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            code,
                            codeVerifier,
                            redirectUri: REDIRECT_URI
                        }),
                        credentials: 'include'
                    });
                    
                    if (response.ok) {
                        setIsAuthorized(true);
                        // Clean up URL
                        window.history.replaceState({}, document.title, "/");
                        // Clear the code verifier
                        localStorage.removeItem('code_verifier');
                        // Fetch current track immediately
                        fetchPublicTrack();
                    } else {
                        const errorData = await response.json();
                        setError(errorData.error || 'Failed to authenticate');
                    }
                } catch (error) {
                    console.error('Error sending token to backend:', error);
                    setError('Failed to complete authentication');
                }
            };
            
            sendTokenToBackend();
        }
    }, []);

    const login = async () => {
        try {
            const codeVerifier = generateRandomString(128);
            const codeChallenge = await generateCodeChallenge(codeVerifier);
            
            // Store the code verifier for later use
            localStorage.setItem('code_verifier', codeVerifier);
            
            const scope = 'user-read-currently-playing';
            const authUrl = new URL('https://accounts.spotify.com/authorize');
            
            const params = {
                response_type: 'code',
                client_id: SPOTIFY_CLIENT_ID,
                scope: scope,
                code_challenge_method: 'S256',
                code_challenge: codeChallenge,
                redirect_uri: REDIRECT_URI,
            };
            
            authUrl.search = new URLSearchParams(params).toString();
            window.location.href = authUrl.toString();
        } catch (error) {
            console.error('Error during login:', error);
            setError('Failed to initiate login');
        }
    };

    const logout = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/logout`, {
                method: 'POST',
                credentials: 'include'
            });
            
            if (response.ok) {
                setIsAuthorized(false);
                setCurrentTrack(null);
            } else {
                setError('Failed to logout');
            }
        } catch (error) {
            console.error('Error logging out:', error);
            setError('Failed to logout');
        }
    };

    // Don't show loading state for too long
    if (isLoading) {
        return (
            <div className="text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                    Loading...
                </div>
            </div>
        );
    }

    // Show error if there's a connection issue
    if (error) {
        return (
            <div className="text-sm text-red-600">
                {error}
                <button 
                    onClick={() => {
                        setError(null);
                        checkAuthStatus();
                        fetchPublicTrack();
                    }}
                    className="ml-2 text-blue-600 hover:underline"
                >
                    Retry
                </button>
            </div>
        );
    }

    // Always show current track if available, regardless of auth status
    if (currentTrack) {
        return (
            <div>
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
                            title="Open in Spotify"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                            </svg>
                        </a>
                    )}
                </div>
                {isAuthorized && (
                    <button 
                        onClick={logout}
                        className="mt-3 text-sm text-gray-500 hover:text-gray-700 underline"
                    >
                        Stop sharing what I'm playing
                    </button>
                )}
            </div>
        );
    }

    // Show connect button only if not authorized
    if (!isAuthorized) {
        return (
            <div>
                <div className="text-sm text-gray-600 mb-3">
                    No track currently playing
                </div>
                <button 
                    onClick={login}
                    className="bg-[#1DB954] text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#1ed760] transition-colors shadow-md"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    Connect to Spotify
                </button>
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