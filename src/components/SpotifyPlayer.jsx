import React, { useState, useEffect } from 'react';

const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.NODE_ENV === 'production' 
    ? 'https://photic23.vercel.app/'
    : 'http://localhost:3000';

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
    const [token, setToken] = useState(() => {
        // Initialize from localStorage
        return localStorage.getItem('spotify_access_token') || '';
    });
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    
    // Helper function to save tokens
    const saveTokens = (accessToken, refreshToken, expiresIn) => {
        localStorage.setItem('spotify_access_token', accessToken);
        if (refreshToken) {
            localStorage.setItem('spotify_refresh_token', refreshToken);
        }
        // Store expiration time
        const expirationTime = new Date().getTime() + (expiresIn * 1000);
        localStorage.setItem('spotify_token_expiration', expirationTime.toString());
        setToken(accessToken);
    };

    // Helper function to check if token is expired
    const isTokenExpired = () => {
        const expiration = localStorage.getItem('spotify_token_expiration');
        if (!expiration) return true;
        return new Date().getTime() > parseInt(expiration);
    };

    // Function to refresh the access token
    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem('spotify_refresh_token');
        if (!refreshToken) {
            // No refresh token, need to re-authenticate
            setToken('');
            return false;
        }

        setIsRefreshing(true);
        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken,
                    client_id: SPOTIFY_CLIENT_ID,
                }),
            });

            const data = await response.json();
            if (data.access_token) {
                saveTokens(data.access_token, data.refresh_token, data.expires_in);
                return true;
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
        } finally {
            setIsRefreshing(false);
        }
        return false;
    };

    useEffect(() => {
        // Handle the callback from Spotify
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        
        if (code) {
            // Exchange code for token
            const codeVerifier = localStorage.getItem('code_verifier');
            
            const getToken = async () => {
                try {
                    const response = await fetch('https://accounts.spotify.com/api/token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams({
                            grant_type: 'authorization_code',
                            code: code,
                            redirect_uri: REDIRECT_URI,
                            client_id: SPOTIFY_CLIENT_ID,
                            code_verifier: codeVerifier,
                        }),
                    });
                    
                    const data = await response.json();
                    if (data.access_token) {
                        saveTokens(data.access_token, data.refresh_token, data.expires_in);
                        // Clean up URL
                        window.history.replaceState({}, document.title, "/");
                    }
                } catch (error) {
                    console.error('Error getting token:', error);
                }
            };
            
            getToken();
        }
    }, []);

    // Check token validity on mount and refresh if needed
    useEffect(() => {
        if (token && isTokenExpired()) {
            refreshAccessToken();
        }
    }, []);

    const login = async () => {
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
    };

    const logout = () => {
        localStorage.removeItem('spotify_access_token');
        localStorage.removeItem('spotify_refresh_token');
        localStorage.removeItem('spotify_token_expiration');
        setToken('');
        setCurrentTrack(null);
    };

    useEffect(() => {
        if (!token || isRefreshing) return;

        const fetchCurrentTrack = async () => {
            try {
                const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (response.status === 200) {
                    const data = await response.json();
                    setCurrentTrack(data);
                } else if (response.status === 401) {
                    // Token expired, try to refresh
                    console.log('Token expired, attempting refresh');
                    const refreshed = await refreshAccessToken();
                    if (!refreshed) {
                        // Refresh failed, need to re-authenticate
                        logout();
                    }
                } else if (response.status === 204) {
                    // No content - nothing playing
                    setCurrentTrack(null);
                }
            } catch (error) {
                console.error('Error fetching current track:', error);
            }
        };

        fetchCurrentTrack();
        const interval = setInterval(fetchCurrentTrack, 5000);

        return () => clearInterval(interval);
    }, [token, isRefreshing]);

    if (!token) {
        return (
            <button 
                onClick={login}
                className="bg-[#1DB954] text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-[#1ed760] transition-colors"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Connect to Spotify
            </button>
        );
    }

    return (
        <div>
            {currentTrack ? (
                <div className="flex items-center gap-3 bg-black/10 p-2 rounded-lg">
                    {currentTrack.item?.album.images[0] && (
                        <img 
                            src={currentTrack.item.album.images[0].url} 
                            alt={currentTrack.item.name}
                            className="w-12 h-12 rounded"
                        />
                    )}
                    <div className="flex flex-col flex-1">
                        <span className="font-medium text-sm">{currentTrack.item?.name || 'Unknown Track'}</span>
                        <span className="text-xs text-gray-600">
                            {currentTrack.item?.artists.map(artist => artist.name).join(', ') || 'Unknown Artist'}
                        </span>
                    </div>
                </div>
            ) : (
                <div className="text-sm text-gray-600">
                    No track currently playing
                </div>
            )}
            <button 
                onClick={logout}
                className="mt-2 text-xs text-gray-500 hover:text-gray-700 underline"
            >
                Disconnect Spotify
            </button>
        </div>
    );
}

export default SpotifyPlayer;