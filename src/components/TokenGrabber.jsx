import React, { useEffect, useState } from 'react';

function TokenGrabber() {
    const [tokens, setTokens] = useState(null);
    const CLIENT_ID = 'your_spotify_client_id_here'; // Add your actual client ID
    const REDIRECT_URI = 'https://photic23.vercel.app/';
    
    useEffect(() => {
        // Check if we're in token grab mode
        const params = new URLSearchParams(window.location.search);
        if (params.get('grab_token') === 'true') {
            // Show auth button
            document.getElementById('tokenGrabber').style.display = 'block';
        }
        
        // Check for auth callback
        if (params.get('code')) {
            handleCallback(params.get('code'));
        }
    }, []);
    
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
                localStorage.setItem('spotify_refresh_token', data.refresh_token);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    return (
        <div id="tokenGrabber" style={{ display: 'none', padding: '20px', background: '#f0f0f0', margin: '20px' }}>
            <h2>Get Spotify Token</h2>
            {!tokens ? (
                <button onClick={login} style={{ background: '#1db954', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '20px' }}>
                    Login with Spotify
                </button>
            ) : (
                <div>
                    <h3>Your Refresh Token:</h3>
                    <pre style={{ background: '#000', color: '#0f0', padding: '10px', wordBreak: 'break-all' }}>
                        {tokens.refresh_token}
                    </pre>
                    <p>Add this to Vercel environment variables:</p>
                    <pre style={{ background: '#000', color: '#0f0', padding: '10px' }}>
                        SPOTIFY_REFRESH_TOKEN={tokens.refresh_token}
                    </pre>
                </div>
            )}
        </div>
    );
}
