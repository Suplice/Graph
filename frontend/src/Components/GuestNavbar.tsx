import React from "react";
import { VscGraphLine } from "react-icons/vsc";

const GuestNavbar: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-between pb-16 pt-12  ">
      <div className="flex items-center space-x-4 ">
        <VscGraphLine size={60} />
        <p className="text-4xl font-semibold">Grapher</p>
      </div>
      <ul className="flex space-x-12 text-2xl antialiased ">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#getstarted">Get Started</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
      <div className="flex space-x-4 text-lgw font-mono">
        <button className="px-4 py-2 rounded text-3xl">Sign In</button>
        <button className="bg-blue-500 text-white px-5 py-3 rounded-xl text-3xl hover:bg-blue-600 transition-colors duration-300">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default GuestNavbar;
