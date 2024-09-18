import React, { useEffect, useState } from "react";
import { VscGraphLine } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";

const GuestNavbar: React.FC = () => {
  const [status, setStatus] = useState<"none" | "partial" | "full">("none");

  useEffect(() => {
    const handleStatusChange = () => {
      const currentWidth = window.innerWidth;

      console.log(currentWidth);

      if (currentWidth >= 1536) {
        setStatus("none");
      } else if (currentWidth >= 1124) {
        setStatus("partial");
      } else {
        setStatus("full");
      }
    };

    window.addEventListener("resize", handleStatusChange);

    handleStatusChange();

    return () => window.removeEventListener("resize", handleStatusChange);
  }, []);

  return (
    <div className="flex flex-wrap items-center  pb-16 pt-12  lg:flex-row gap-4 justify-between ">
      <NavLink to="/">
        <div className="flex items-center space-x-4 ">
          <VscGraphLine className="size-12 md:size-16" />
          <p className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            Grapher
          </p>
        </div>
      </NavLink>

      <ul className="hidden lg:space-x-16 justify-center items-center text-2xl flex-wrap flex-col  xlg:flex-row xlg:flex lg:mx-4">
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
      <div className="lg:space-x-4 text-lg font-mono lg:flex-row hidden 2xl:flex ">
        <NavLink to="/SignIn">
          <button className="px-4 py-2 rounded text-3xl">Sign In</button>
        </NavLink>
        <button className="bg-blue-500 text-white px-5 py-3 rounded-xl text-3xl hover:bg-blue-600 transition-colors duration-300">
          Sign Up
        </button>
      </div>

      <BurgerMenu status={status} />
    </div>
  );
};

export default GuestNavbar;
