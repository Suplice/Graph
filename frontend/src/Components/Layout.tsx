import React, { useEffect } from "react";
import GuestNavbar from "./GuestNavbar";
import MainFooter from "./MainFooter";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isLoggedIn }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      {isLoggedIn ? <GuestNavbar></GuestNavbar> : <GuestNavbar></GuestNavbar>}
      <main>{children}</main>
      <MainFooter></MainFooter>
    </div>
  );
};

export default Layout;
