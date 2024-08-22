import React from "react";
import Track from "./Track";

function SearchResults({ tracks, onAddToPlaylist }) {
  return (
    <div>
      <h2>Search results:</h2>
      <ul>
        {tracks.map((track) => (
          <Track key={track.id} track={track} onAddToPlaylist={onAddToPlaylist} />
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
