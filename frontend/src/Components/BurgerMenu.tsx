import React, { useState, useRef, useEffect } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";

interface BurgerMenuProps {
  status: "none" | "partial" | "full";
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ status }) => {
  const [isVisible, setIsVisible] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !iconRef.current?.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`${status === "none" ? "hidden" : "relative"}`}>
      <div ref={iconRef} className="">
        <RiMenu3Line
          size={40}
          onClick={() => {
            setIsVisible(!isVisible);
          }}
          className="cursor-pointer"
        />
      </div>
      <div
        ref={menuRef}
        className={`absolute w-48 border transform -translate-x-[156px] rounded-lg text-center z-40 ${status === "partial" ? "" : "pt-2"}  bg-slate-200  ${isVisible ? "absolute" : "hidden"}`}
      >
        <ul className="flex flex-col gap-2">
          <li className={`${status === "full" ? "" : "hidden"}`}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "font-bold" : "font-serif"
              }
            >
              Home
            </NavLink>
          </li>
          <li className={`${status === "full" ? "" : "hidden"}`}>
            <NavLink
              to="/About"
              className={({ isActive }) =>
                isActive ? "font-bold" : "font-serif"
              }
            >
              About
            </NavLink>
          </li>
          <li className={`${status === "full" ? "" : "hidden"}`}>
            <NavLink
              to="/GetStarted"
              className={({ isActive }) =>
                isActive ? "font-bold" : "font-serif"
              }
            >
              Get Started
            </NavLink>
          </li>
          <li className={`${status === "full" ? "" : "hidden"}`}>
            <NavLink
              to="/Contact"
              className={({ isActive }) =>
                isActive ? "font-bold" : "font-serif"
              }
            >
              Contact
            </NavLink>
          </li>
          <li
            className={`${status === "partial" || status === "full" ? "" : "hidden"}`}
          >
            <NavLink
              to="/SignIn"
              className={` block font-mono  ${status === "partial" ? "hover:bg-slate-50 rounded-md p-1" : "border-diminished-t pt-2 mt-1 "}  transition-colors`}
            >
              Sign In
            </NavLink>
          </li>
          <li
            className={`${status === "partial" || status === "full" ? "" : "hidden"} `}
          >
            <NavLink
              to="/Register"
              className="hover:bg-blue-600 block font-mono text-white bg-blue-500 rounded-md p-1 transition-colors"
            >
              Sign Up
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BurgerMenu;
