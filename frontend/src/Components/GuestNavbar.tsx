import React from "react";
import { VscGraphLine } from "react-icons/vsc";
import { NavLink } from "react-router-dom";

const GuestNavbar: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-center pb-16 pt-12 flex-col  lg:flex-row gap-4 lg:justify-center 2xl:justify-between ">
      <div className="flex items-center space-x-4 ">
        <VscGraphLine size={60} />
        <p className="text-4xl font-semibold">Grapher</p>
      </div>
      <ul className="flex lg:space-x-16 justify-center items-center text-2xl flex-wrap flex-col lg:flex-row lg:mx-4">
        <li className="relative">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? " font-semibold hover:text-[1.75rem] transition-all duration-200 ease-in-out block"
                : " hover:text-[1.75rem] transition-all duration-200 ease-in-out block"
            }
          >
            Home
          </NavLink>
        </li>
        <li className="relative">
          <NavLink
            to="/About"
            className={({ isActive }) =>
              isActive
                ? " font-semibold hover:text-[1.75rem] transition-all duration-200 ease-in-out block"
                : " hover:text-[1.75rem] transition-all duration-200 ease-in-out block"
            }
          >
            About
          </NavLink>
        </li>
        <li className="relative">
          <NavLink
            to="/GetStarted"
            className={({ isActive }) =>
              isActive
                ? " font-semibold hover:text-[1.75rem] transition-all duration-200 ease-in-out block"
                : " hover:text-[1.75rem] transition-all duration-200 ease-in-out block"
            }
          >
            Get Started
          </NavLink>
        </li>
        <li className="relative">
          <NavLink
            to="/Contact"
            className={({ isActive }) =>
              isActive
                ? " font-semibold hover:text-[1.75rem] transition-all duration-200 ease-in-out block"
                : " hover:text-[1.75rem] transition-all duration-200 ease-in-out block"
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>
      <div className="flex lg:space-x-4 text-lgw font-mono flex-col lg:flex-row ">
        <button className="px-4 py-2 rounded text-3xl">Sign In</button>
        <button className="bg-blue-500 text-white px-5 py-3 rounded-xl text-3xl hover:bg-blue-600 transition-colors duration-300">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default GuestNavbar;
