import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import CreateDoc from "./pages/CreateDoc";
import Protect from "./protect/Protect";
import ParticularDocument from "./pages/ParticularDocument";
import Demo from "./pages/Demo";


const App = () => {
  return (
    <>
      <Toaster position="top-right" richColors />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={
          <Protect>
            <Profile />
          </Protect>
        } />

        <Route path="/about" element={
          <Protect>
            <About />
          </Protect>
        } />
        <Route path="/contact" element={
          <Protect>
            <Contact />
          </Protect>
        } />

        <Route path="/dashboard" element={
          <Protect>
            <Dashboard />
          </Protect>
        } />

        <Route path="/document/:id" element={
          <Protect>
            <CreateDoc />
          </Protect>
        } />

        <Route path="/particulardocument/:id" element={
          <Protect>
            <ParticularDocument />
          </Protect>
        } />

        <Route path="/demo" element={<Demo/>}/>

      </Routes>
    </>
  );
};

export default App;