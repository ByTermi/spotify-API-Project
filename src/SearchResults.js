import React from "react";
import Track from "./Track";

function SearchResults({ tracks, onAddToPlaylist }) {
  return (
    <div>
      <h2>Resultados de la Búsqueda:</h2>
      <ul>
        {tracks.map((track) => (
          <Track key={track.id} track={track} onAddToPlaylist={onAddToPlaylist} />
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
