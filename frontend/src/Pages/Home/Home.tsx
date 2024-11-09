import React from "react";
import UserNavbar from "../../Components/Navigation/UserNavbar";
import MainField from "../../Components/MainField/MainField";
import { MenuRouteProvider } from "../../Context/MenuRouteContext";

const Home: React.FC = () => {
  return (
    <MenuRouteProvider>
      <div className="flex flex-row bg-[#eeecec] w-screen h-screen">
        <UserNavbar></UserNavbar>
        <MainField></MainField>
      </div>
    </MenuRouteProvider>
  );
};

export default Home;
