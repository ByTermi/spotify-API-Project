import React, { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./SearchBar";
import Auth from "./Auth";
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");
    if (token) {
      setAccessToken(token);
      window.location.hash = "";
    }
  }, []);


  async function search() {
    if (!searchQuery) return;


    if (!accessToken) {
      alert("No access token available. Please log in.");
      return;
    }

    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=10`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401 || response.status === 403) {
        alert("Access token expired or invalid. Please log in again.");
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Error en la solicitud: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setTracks(data.tracks.items);
    } catch (error) {
      console.error("Error al buscar las pistas:", error);
    }
  }

  function addToPlaylist(track) {
    setPlaylist((prevPlaylist) => [...prevPlaylist, track]);
  }

  async function savePlaylistToSpotify() {
    if (playlist.length === 0) {
      alert("No hay pistas en la playlist para guardar.");
      return;
    }

    try {
      const userProfileResponse = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!userProfileResponse.ok) {
        throw new Error("Error al obtener el perfil del usuario");
      }

      const userProfileData = await userProfileResponse.json();
      const userId = userProfileData.id;

      const createPlaylistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: playlistName,
            description: "Playlist created with the Spotify API",
            public: false,
          }),
        }
      );

      if (!createPlaylistResponse.ok) {
        throw new Error("Error al crear la playlist");
      }

      const playlistData = await createPlaylistResponse.json();
      const playlistId = playlistData.id;

      const trackUris = playlist.map((track) => track.uri);
      const addTracksResponse = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uris: trackUris,
          }),
        }
      );

      if (!addTracksResponse.ok) {
        throw new Error("Error al añadir pistas a la playlist");
      }

      alert("Playlist guardada exitosamente en tu cuenta de Spotify!");
    } catch (error) {
      alert(
        "Hubo un error al guardar la playlist. Por favor, inténtalo de nuevo."
      );
    }
  }

  return (
    <div className="App">
      {!accessToken ? (
        <Auth />
      ) : (
        <>
          <SearchBar
            search={searchQuery}
            onSearchChange={setSearchQuery}
            onSubmit={search}
          />
          <div id="container">
            {tracks.length > 0 && (
              <SearchResults tracks={tracks} onAddToPlaylist={addToPlaylist} />
            )}
            <Playlist
              playlist={playlist}
              onSavePlaylist={savePlaylistToSpotify}
              playlistName={playlistName}
              setPlaylistName={setPlaylistName}
              setPlaylist={setPlaylist}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
