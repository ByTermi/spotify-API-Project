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
        {playlist.map((track, index) => (
          <li key={`${track.id}-${index}`} className="songContainer">
            <strong>{track.name}</strong>{" "}
            {track.artists.map((artist) => artist.name).join(", ")}
            <button
              onClick={() => {
                setPlaylist((prevPlaylist) =>
                  prevPlaylist.filter((_, i) => i !== index)
                );
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={onSavePlaylist}>Guardar Playlist en Spotify</button>
    </div>
  );
}

export default Playlist;
