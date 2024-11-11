import React from "react";
import Layout from "../Layout/Layout";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Landing from "../../Pages/Landing/Landing";
import Contact from "../../Pages/Contact/Contact";
import SignIn from "../../Pages/SignIn/SignIn";
import About from "../../Pages/About/About";
import SignUp from "../../Pages/SignUp/SignUp";
import { useAuth } from "../../Context/AuthContext";
import Home from "../../Pages/Home/Home";

const Main: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div
      className="background mx-auto w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(/Images/bg.jpg)" }}
    >
      <div className={`${isLoggedIn ? "w-max z-20" : "w-9/12 mx-auto z-20"}`}>
        <Router>
          <Layout>
            <Routes>
              <Route
                path="/"
                element={isLoggedIn ? <Navigate to="/home" /> : <Landing />}
              ></Route>
              <Route path="/Contact" element={<Contact />}></Route>
              <Route
                path="/GetStarted"
                element={isLoggedIn ? <Navigate to="/home" /> : <SignUp />}
              ></Route>
              <Route path="/About" element={<About />}></Route>
              <Route
                path="/SignIn"
                element={isLoggedIn ? <Navigate to="/home" /> : <SignIn />}
              ></Route>
              <Route
                path="/SignUp"
                element={isLoggedIn ? <Navigate to="/home" /> : <SignUp />}
              ></Route>
              <Route
                path="/home"
                element={isLoggedIn ? <Home /> : <Navigate to="/" />}
              ></Route>
            </Routes>
          </Layout>
        </Router>
      </div>
    </div>
  );
};

export default Main;
