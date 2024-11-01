import React from "react";
import Overview from "../Overview/Overview";

interface MainFieldProps {
  selectedTab: string;
}

const MainField: React.FC<MainFieldProps> = ({ selectedTab }) => {
  const selectedComponent = () => {
    switch (selectedTab) {
      case "Overview":
        return <Overview />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="w-5/6 my-auto mx-2  ml-0 bg-[#FFFFFF] rounded-lg border-2 border-gray-300 ">
      {selectedComponent()}
    </div>
  );
};

export default MainField;
