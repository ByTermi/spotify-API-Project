import React from "react";

const CLIENT_ID = "62c10705764347f589fd879a596f5e2a";
const REDIRECT_URI = `https://music-api-project-jaime-novillo.netlify.app/`;
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=playlist-modify-private`;



function Auth() {
  return (
    <div id="signIn">
      <a href={AUTH_URL}>
        <p>Iniciar sesión con Spotify</p>
        <img src="/images/spotify.svg" alt="Spotify logo" />
      </a>
    </div>
  );
}

export default Auth;
