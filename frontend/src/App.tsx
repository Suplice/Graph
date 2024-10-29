import React, { useState } from "react";
import Landing from "./Pages/Landing/Landing";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import { AuthProvider } from "./Context/AuthContext";
import Main from "./Components/Main/Main";

function App() {
  return (
    <AuthProvider>
      <div
        className="background mx-auto w-full min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url(/Images/bg.jpg)" }}
      >
        <div className="w-9/12 mx-auto z-20">
          <Router>
            <Main />
          </Router>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
