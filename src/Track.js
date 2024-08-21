import React from "react";

function Track({ track, onAddToPlaylist }) {
  return (
    <li key={track.id} className="songContainer">
      <strong>{track.name}</strong> {track.artists.map(artist => artist.name).join(", ")}
      <button onClick={() => onAddToPlaylist(track)}>Add to Playlist</button>
    </li>
  );
}

export default Track;
