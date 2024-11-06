import React from "react";
import Overview from "../Overview/Overview";
import FunctionPlotter from "../FunctionPlotter/FunctionPlotter";

interface MainFieldProps {
  selectedTab: string;
}

const MainField: React.FC<MainFieldProps> = ({ selectedTab }) => {
  const selectedComponent = () => {
    switch (selectedTab) {
      case "Overview":
        return <Overview />;
      case "Plotter":
        return <FunctionPlotter />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="w-5/6   bg-[#FFFFFF] rounded-lg border-2 border-gray-300 overflow-auto">
      {selectedComponent()}
    </div>
  );
};

export default MainField;
