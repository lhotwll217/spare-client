import React from "react";

import NavBar from "../../features/navBar/NavBar";
import "./styles.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../../features/home/Home";
import ListItemPage from "../../features/listItem/ListItemPage";
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='listitem' element={<ListItemPage />} />
      </Routes>
    </Router>
  );
}

export default App;
