import React, { useState } from "react";
import Landing from "./Pages/Landing";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className=" w-9/12 mx-auto">
      <Router>
        <Layout isLoggedIn={isLoggedIn}>
          <Routes>
            <Route path="/" element={<Landing />}></Route>
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
