import React from "react";

const GraphTypesCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full h-full border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center ">
        Graph Types
      </h2>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gray-700 text-lg font-medium hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200 cursor-pointer">
          <span className="text-2xl">📊</span>
          <span>Pie Chart</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700 text-lg font-medium hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200 cursor-pointer">
          <span className="text-2xl">📈</span>
          <span>Line Graph</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700 text-lg font-medium hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200 cursor-pointer">
          <span className="text-2xl">📉</span>
          <span>Bar Chart</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700 text-lg font-medium hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200 cursor-pointer">
          <span className="text-2xl">🧮</span>
          <span>Function Plot</span>
        </div>
      </div>
    </div>
  );
};

export default GraphTypesCard;
