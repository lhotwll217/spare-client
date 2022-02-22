import React from "react";
import NavBar from "../../features/navBar/NavBar";
import "./styles.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../../features/home/Home";

import Sandbox from "../../features/sandbox/Sandbox";
import ListFormPage from "../../features/listings/listForm/ListFormPage";
import ModalManager from "../common/modals/ModalManager";
import ProfilePage from "../../features/profile/profilePage/ProfilePage";
import {useSelector} from "react-redux";
import {Loader} from "semantic-ui-react";
import ScrollToTop from "./ScrollToTop";
function App() {
  const {initialized} = useSelector((state) => state.async);

  if (!initialized) {
    return <Loader content='Loading' />;
  }
  return (
    <Router>
      <ScrollToTop />
      <ModalManager />
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='listform' element={<ListFormPage />} />
        <Route path='sandbox' element={<Sandbox />} />
        <Route path='/profile/:userId' element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
