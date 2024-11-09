import React from "react";
import { useMenuRoute } from "../../../Context/MenuRouteContext";

const RecentUploadsCard: React.FC = () => {
  const { setSelectedTab } = useMenuRoute();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full h-full border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Recent Data Uploads
      </h2>

      <ul className="space-y-3 mb-6">
        <li className="flex items-center justify-between text-gray-700 bg-gray-50 p-3 rounded-lg shadow-sm">
          <span>Data_File_1.xlsx</span>
          <span className="text-gray-400 text-sm">10/31/2023</span>
        </li>
        <li className="flex items-center justify-between text-gray-700 bg-gray-50 p-3 rounded-lg shadow-sm">
          <span>Data_File_2.xlsx</span>
          <span className="text-gray-400 text-sm">10/25/2023</span>
        </li>
        <li className="flex items-center justify-between text-gray-700 bg-gray-50 p-3 rounded-lg shadow-sm">
          <span>Data_File_3.xlsx</span>
          <span className="text-gray-400 text-sm">10/20/2023</span>
        </li>
      </ul>

      <button
        onClick={() => setSelectedTab("Graph")}
        className="w-full p-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Upload New File
      </button>
    </div>
  );
};

export default RecentUploadsCard;
