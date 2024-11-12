import React from "react";
import { useMenuRoute } from "../../../Context/MenuRouteContext";

const QuickStartGuideCard: React.FC = () => {
  const { setSelectedTab } = useMenuRoute();

  return (
    <div className="bg-slate-300 rounded-xl shadow-lg p-6 w-full h-full border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center ">
        Quick Start Guide
      </h2>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gray-700 text-lg font-medium p-3 bg-gray-50 rounded-lg shadow-sm">
          <span className="text-indigo-600 font-bold text-xl">1.</span>
          <span>Upload your data</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700 text-lg font-medium p-3 bg-gray-50 rounded-lg shadow-sm">
          <span className="text-indigo-600 font-bold text-xl">2.</span>
          <span>Select a graph type</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700 text-lg font-medium p-3 bg-gray-50 rounded-lg shadow-sm">
          <span className="text-indigo-600 font-bold text-xl">3.</span>
          <span>Customize your graph</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700 text-lg font-medium p-3 bg-gray-50 rounded-lg shadow-sm">
          <span className="text-indigo-600 font-bold text-xl">4.</span>
          <span>Download your graph</span>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          onClick={() => setSelectedTab("Graph")}
          className=" bg-indigo-500 text-white py-2 px-4 mt-10 rounded-lg  "
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default QuickStartGuideCard;
