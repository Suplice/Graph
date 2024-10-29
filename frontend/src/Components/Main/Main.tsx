import React from "react";
import Layout from "../Layout/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "../../Pages/Landing/Landing";
import Contact from "../../Pages/Contact/Contact";
import SignIn from "../../Pages/SignIn/SignIn";
import About from "../../Pages/About/About";
import SignUp from "../../Pages/SignUp/SignUp";
import { useAuth } from "../../Context/AuthContext";

const Main: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Layout>
      <Routes>
        <Route path="*" element={<Landing />}></Route>
        <Route path="/" element={<Landing />}></Route>
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
      </Routes>
    </Layout>
  );
};

export default Main;
