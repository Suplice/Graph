import React from "react";
import Overview from "../Overview/Overview";
import FunctionPlotter from "../FunctionPlotter/FunctionPlotter";
import GraphManager from "../../Pages/GraphManager/GraphManager";
import { useMenuRoute } from "../../Context/MenuRouteContext";
import { GraphDataProvider } from "../../Context/GraphDataContext";

const MainField: React.FC = () => {
  const { selectedTab } = useMenuRoute();

  const selectedComponent = () => {
    switch (selectedTab) {
      case "Overview":
        return <Overview />;
      case "Plotter":
        return <FunctionPlotter />;
      case "Graph":
        return <GraphManager />;
      default:
        return <Overview />;
    }
  };

  return (
    <GraphDataProvider>
      <div className="lg:w-full w-full   bg-[#FFFFFF] rounded-lg border-2 border-gray-300 overflow-auto">
        {selectedComponent()}
      </div>
    </GraphDataProvider>
  );
};

export default MainField;
