import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./Context/AuthContext";
import Main from "./Components/Main/Main";
import { getAuth } from "firebase/auth";

function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

export default App;
