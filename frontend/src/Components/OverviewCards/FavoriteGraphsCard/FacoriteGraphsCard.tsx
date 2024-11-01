import React from "react";

const FavoriteGraphsCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full h-full border border-gray-200 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-gray-800">Favorite Graphs</h2>
      <p className="text-gray-600 mt-2">Quickly access your favorite graphs.</p>

      <div className="flex flex-row gap-6 mt-6">
        <div className="flex flex-col gap-4">
          <div className="w-36 h-36 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg flex items-center justify-center text-center font-medium text-indigo-700 text-sm shadow-sm hover:shadow-lg transition-shadow">
            Pie Chart - Sales Data
          </div>
          <div className="w-36 h-36 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center text-center font-medium text-green-700 text-sm shadow-sm hover:shadow-lg transition-shadow">
            Line Graph - Monthly Revenue
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="w-36 h-36 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg flex items-center justify-center text-center font-medium text-yellow-700 text-sm shadow-sm hover:shadow-lg transition-shadow">
            Bar Chart - Product Performance
          </div>
          <div className="w-36 h-36 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center text-center font-medium text-red-700 text-sm shadow-sm hover:shadow-lg transition-shadow">
            Scatter Plot - User Engagement
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteGraphsCard;
