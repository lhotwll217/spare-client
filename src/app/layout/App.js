import React from "react";
import FeedContainer from "../../features/mainFeed/FeedContainer";
import MapContainer from "../../features/map/MapContainer";
import NavBar from "../../features/navBar/NavBar";
import "./styles.css";

function App() {
  return (
    <div>
      <NavBar />
      <MapContainer />
      <FeedContainer />
    </div>
  );
}

export default App;
