import React, { useState } from "react";
import UserNavbar from "../../Components/Navigation/UserNavbar";
import MainField from "../../Components/MainField/MainField";

const Home: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("Overview");

  return (
    <div className="flex flex-row bg-[#eeecec] w-screen h-screen">
      <UserNavbar
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      ></UserNavbar>
      <MainField selectedTab={selectedTab}></MainField>
    </div>
  );
};

export default Home;
