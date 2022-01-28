import React from "react";
import FeedContainer from "../../features/mainFeed/FeedContainer";
import MapContainer from "../../features/map/MapContainer";
import MyMap from "../../features/map/MyMap";
import "./styles.css";

function App() {
  return (
    <div>
      <MapContainer />
      <FeedContainer />
    </div>
  );
}

export default App;
