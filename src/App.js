import React from "react";
import "./App.css";
import AlbumList from "./components/AlbumList";

function App() {
  return (
    <div className="App">
    <nav>
     <ul class="nav-links">
      <li>Album Manager</li>
      <li> </li>
      <li> </li>
     </ul>
    </nav>

      <AlbumList />
    </div>
  );
}

export default App;
