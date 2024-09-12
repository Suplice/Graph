import React, { useState } from "react";
import Landing from "./Pages/Landing";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="background">
      <div className=" w-9/12 mx-auto z-20  bg-[radial-gradient(circle, rgba(112,132,200,0.2) 20%, rgba(21,0,210,0) 30%) 100px 100px, radial-gradient(circle, rgba(150,180,250,0.2) 20%, rgba(21,0,210,0) 40%) 500px 300px, radial-gradient(circle, rgba(100,150,250,0.15) 0%, rgba(0,0,0,0) 50%) 200px 100px]">
        <Router>
          <Layout isLoggedIn={isLoggedIn}>
            <Routes>
              <Route path="/" element={<Landing />}></Route>
            </Routes>
          </Layout>
        </Router>
      </div>
    </div>
  );
}

export default App;
