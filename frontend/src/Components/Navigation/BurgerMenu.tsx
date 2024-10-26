import { duration } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
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
      <AnimatePresence>
        {isVisible ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.0, y: -20 }}
            animate={{ opacity: 1, scale: 1.0, y: 0 }}
            exit={{ opacity: 0, scale: 0.0, y: -20 }}
            style={{ originX: 1, originY: 0 }}
            transition={{ duration: 0.3 }}
            ref={menuRef}
            className={` w-48 md:w-72 border transform    right-0 rounded-lg absolute text-center z-40 ${status === "partial" ? "" : "pt-2"}  bg-slate-200  ${isVisible ? "" : "hidden"}`}
          >
            <ul className="flex flex-col ">
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
                  className={`hover:bg-gray-300 block font-semibold font-mono py-3   transition-colors  ${status === "partial" ? " " : "border-diminished-t  "}`}
                >
                  Sign In
                </NavLink>
              </li>
              <li
                className={`${status === "partial" || status === "full" ? "" : "hidden"} `}
              >
                <NavLink
                  to="/SignUp"
                  className="hover:bg-gray-300 block font-mono text-black rounded-md  transition-colors w-full py-3 font-semibold border-diminished-t"
                >
                  Sign Up
                </NavLink>
              </li>
            </ul>
          </motion.div>
        ) : (
          ""
        )}
      </AnimatePresence>
    </div>
  );
};

export default BurgerMenu;
