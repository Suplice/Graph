import React, { useEffect } from "react";
import GuestNavbar from "../Navigation/GuestNavbar";
import MainFooter from "./MainFooter";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      {isLoggedIn ? <></> : <GuestNavbar></GuestNavbar>}
      <main className="flex-grow">{children}</main>
      {isLoggedIn ? <></> : <MainFooter></MainFooter>}
    </div>
  );
};

export default Layout;
