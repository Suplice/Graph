import React from "react";
import GuestNavbar from "./GuestNavbar";
import MainFooter from "./MainFooter";

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn ? <GuestNavbar></GuestNavbar> : <GuestNavbar></GuestNavbar>}
      <main>{children}</main>
      <MainFooter></MainFooter>
    </div>
  );
};

export default Layout;
