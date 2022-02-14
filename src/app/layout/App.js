import React from "react";
import NavBar from "../../features/navBar/NavBar";
import "./styles.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../../features/home/Home";
import ListItemPage from "../../features/listings/listItem/ListItemPage";
import Sandbox from "../../features/sandbox/Sandbox";
import ListFormPage from "../../features/listings/listForm/ListFormPage";
import ModalManager from "../common/modals/ModalManager";
import ProfilePage from "../../features/profile/profilePage/ProfilePage";
function App() {
  return (
    <Router>
      <ModalManager />
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='listitem' element={<ListItemPage />} />
        <Route path='/listform' element={<ListFormPage />} />
        <Route path='sandbox' element={<Sandbox />} />
        <Route path='/profile/:userId' element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
