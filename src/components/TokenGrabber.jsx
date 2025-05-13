// Safe version using environment variables
import React, { useEffect, useState } from 'react';

function TokenGrabber() {
    const [tokens, setTokens] = useState(null);
    const [error, setError] = useState(null);
    
    // Get from environment variables
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = process.env.NODE_ENV === 'production' 
        ? 'https://photic23.vercel.app/'
        : 'http://localhost:3000/';
    
    useEffect(() => {
        // Check if CLIENT_ID is available
        if (!CLIENT_ID) {
            setError('REACT_APP_SPOTIFY_CLIENT_ID is not set in environment variables');
        }
        
        // Check if we're in token grab mode
        const params = new URLSearchParams(window.location.search);
        if (params.get('grab_token') === 'true') {
            document.getElementById('tokenGrabber').style.display = 'block';
        }
        
        // Check for auth callback
        if (params.get('code')) {
            handleCallback(params.get('code'));
        }
    }, [CLIENT_ID]);
    
    async function generateCodeChallenge() {
        const verifier = Array.from(crypto.getRandomValues(new Uint8Array(32)))
            .map(b => ((b % 26) + 97))
            .map(b => String.fromCharCode(b))
            .join('') + Array.from(crypto.getRandomValues(new Uint8Array(32)))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
            
        localStorage.setItem('code_verifier', verifier);
        
        const encoder = new TextEncoder();
        const data = encoder.encode(verifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
        
        return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }
    
    async function login() {
        if (!CLIENT_ID) {
            setError('Cannot login: Spotify Client ID not configured');
            return;
        }
        
        const codeChallenge = await generateCodeChallenge();
        
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: 'user-read-currently-playing',
            redirect_uri: REDIRECT_URI,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge
        });
        
        window.location.href = `https://accounts.spotify.com/authorize?${params}`;
    }
    
    async function handleCallback(code) {
        const codeVerifier = localStorage.getItem('code_verifier');
        
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
                    client_id: CLIENT_ID,
                    code_verifier: codeVerifier,
                }),
            });
            
            const data = await response.json();
            
            if (data.refresh_token) {
                setTokens(data);
                // Clear URL
                window.history.replaceState({}, document.title, window.location.pathname + '?grab_token=true');
            } else {
                setError('No refresh token received');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        }
    }
    
    return (
        <div id="tokenGrabber" style={{ 
            display: 'none', 
            padding: '20px', 
            background: '#f0f0f0', 
            margin: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h2>Get Spotify Token</h2>
            
            {error && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                    Error: {error}
                </div>
            )}
            
            {!tokens ? (
                <>
                    <p>Environment: {process.env.NODE_ENV}</p>
                    <p>Client ID: {CLIENT_ID ? 'Configured ✓' : 'Not configured ✗'}</p>
                    <p>Redirect URI: {REDIRECT_URI}</p>
                    
                    <button 
                        onClick={login} 
                        disabled={!CLIENT_ID}
                        style={{ 
                            background: CLIENT_ID ? '#1db954' : '#ccc', 
                            color: 'white', 
                            padding: '10px 20px', 
                            border: 'none', 
                            borderRadius: '20px',
                            cursor: CLIENT_ID ? 'pointer' : 'not-allowed',
                            marginTop: '10px'
                        }}
                    >
                        Login with Spotify
                    </button>
                </>
            ) : (
                <div>
                    <h3>Success! Your Refresh Token:</h3>
                    <pre style={{ 
                        background: '#000', 
                        color: '#0f0', 
                        padding: '15px', 
                        wordBreak: 'break-all',
                        borderRadius: '4px',
                        marginBottom: '15px'
                    }}>
                        {tokens.refresh_token}
                    </pre>
                    
                    <h4>Add this to Vercel environment variables:</h4>
                    <pre style={{ 
                        background: '#000', 
                        color: '#0f0', 
                        padding: '15px',
                        borderRadius: '4px'
                    }}>
                        SPOTIFY_REFRESH_TOKEN={tokens.refresh_token}
                    </pre>
                    
                    <p style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
                        After adding to Vercel, you can remove this token grabber code.
                    </p>
                </div>
            )}
        </div>
    );
}

export default TokenGrabber;