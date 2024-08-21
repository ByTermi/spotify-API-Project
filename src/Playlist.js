import React from "react";

function Playlist({ playlist, onSavePlaylist, playlistName, setPlaylistName, setPlaylist }) {
  return (
    <div>
      <h2>Nombre de la Playlist:</h2>
      <input
      type="text"
        name="playlistName"
        value={playlistName}
        onChange={(e) => {
          setPlaylistName(e.target.value);
        }}
      />
      <ul>
        {playlist.map((track) => (
          <li key={track.id} className="songContainer">
            <strong>{track.name}</strong>{" "}
            {track.artists.map((artist) => artist.name).join(", ")}
            <a href="WWW" onClick={setPlaylist(playlist.filter( (current) => current.id !== track.id ))}>PATATA</a>
          </li>
        ))}
      </ul>
      <button onClick={onSavePlaylist}>Guardar Playlist en Spotify</button>
    </div>
  );
}

export default Playlist;
