import React, { useState, useEffect, memo } from "react";
import axios from "axios";

const AlbumForm = memo(({ initialTitle = "", onAddAlbum, onUpdateAlbum }) => {
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onAddAlbum) {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/albums",
        { title }
      );
      onAddAlbum(response.data);
    } else if (onUpdateAlbum) {
      onUpdateAlbum(title);
      setTitle('')
    }
    setTitle("");
  };

  return (
<form onSubmit={handleSubmit} class="form-container">
  <input
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Enter album title"
    class="form-input"
  />
  <button type="submit" class="form-btn">{onAddAlbum ? "Add Album" : "Update Album"}</button>
</form>

  );
});

export default AlbumForm;
