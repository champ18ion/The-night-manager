import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AlbumForm from "./AlbumForm";

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/albums"
    );
    setAlbums(response.data.slice(0,20));
  };

  const handleAddAlbum = useCallback((newAlbum) => {
    newAlbum.id = Math.floor(Math.random() * 1000000); // Generate a random ID
    setAlbums((prevAlbums) => [newAlbum, ...prevAlbums]);
  }, []);
  
  

  const handleUpdateAlbum = useCallback(async (id, title) => {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/albums/${id}`,
      { title }
    );
    setAlbums((prevAlbums) =>
      prevAlbums.map((album) => (album.id === id ? response.data : album))
    );
  }, []);

  const handleDeleteAlbum = useCallback(async (id,) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/albums/${id}`);
    setAlbums((prevAlbums) => prevAlbums.filter((album) => album.id !== id));
  }, []);

  return (
    <div>
      
      <h3>Add a new album....📘</h3>
      <AlbumForm onAddAlbum={handleAddAlbum} />
      <hr
        style={{
          marginTop:'25px',
          background: '#333',
          color: '#333',
          borderColor: '#333',
          height: '3px',
        }}
      />
      <h2>Albums</h2>
      <ul className="cards-container">
        {albums.map((album) => (
          <div className="album-container">
          <h3 key={album.id}>
            {album.title}
          </h3>
          <AlbumForm
              initialTitle={''}
              onUpdateAlbum={(newTitle) =>
                handleUpdateAlbum(album.id, newTitle)
              }
            />
            <button className="delete" onClick={() => handleDeleteAlbum(album.id)}>Delete</button>
          </div>
          
        ))}
      </ul> 

    </div>
  );
};

export default AlbumList;
