import React from 'react';

const CLIENT_ID = "62c10705764347f589fd879a596f5e2a";
const REDIRECT_URI = `${window.location.origin}`; 
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=playlist-modify-public playlist-modify-private`;

function Auth() {
  return (
    <div>
      <a href={AUTH_URL}>Iniciar sesión con Spotify</a>
    </div>
  );
}

export default Auth;
