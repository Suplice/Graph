import React, { useState } from "react";
import Landing from "./Pages/Landing/Landing";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div
      className="background mx-auto w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(/Images/bg.jpg)" }}
    >
      <div className="w-9/12 mx-auto z-20">
        <Router>
          <Layout isLoggedIn={isLoggedIn}>
            <Routes>
              <Route path="/" element={<Landing />}></Route>
              <Route path="/Contact" element={<Contact />}></Route>
              <Route path="/GetStarted" element={<SignIn />}></Route>
              <Route path="/About" element={<About />}></Route>
              <Route path="/SignIn" element={<SignIn />}></Route>
              <Route path="/SignUp" element={<SignUp />}></Route>
            </Routes>
          </Layout>
        </Router>
      </div>
    </div>
  );
}

export default App;
