import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const MainFooter: React.FC = () => {
  return (
    <footer className=" text-black py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-5 md:gap-0 border-t-2 border-slate-400">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold text-center md:text-left">
            Grapher
          </h2>
          <p className="text-gray-700">
            Building the future, one graph at a time.
          </p>
          <p className="text-gray-700">© 2024 Grapher. All rights reserved.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
          <NavLink to="/About" className="hover:underline">
            About Us
          </NavLink>
          <NavLink to="/Contact" className="hover:underline">
            Contact
          </NavLink>
          <NavLink to="/privacy-policy" className="hover:underline">
            Privacy Policy
          </NavLink>
          <NavLink to="/terms" className="hover:underline">
            Terms & Conditions
          </NavLink>
        </div>

        <div className="flex space-x-4">
          <a href="https://facebook.com" aria-label="Facebook">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" aria-label="Twitter">
            <FaTwitter size={24} />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn">
            <FaLinkedin size={24} />
          </a>
          <a href="https://instagram.com" aria-label="Instagram">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
