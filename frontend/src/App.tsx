import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./Context/AuthContext";
import Main from "./Components/Main/Main";
import { getAuth } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <Main />
      <ToastContainer position="top-center" />
    </AuthProvider>
  );
}

export default App;
