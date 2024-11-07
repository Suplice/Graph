import React, { useEffect } from "react";

const StatisticsSummaryCard: React.FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      const id = localStorage.getItem("uid");

      const res = await fetch(
        process.env.React_APP_API_URL + `/api/statistics/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      console.log(data);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full h-full border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Statistics Summary
      </h2>

      <div className="space-y-4 text-gray-700">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm">
          <span className="text-lg font-medium">Total Graphs Created:</span>
          <span className="text-xl font-bold text-indigo-600">10</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm">
          <span className="text-lg font-medium">Data Sets Uploaded:</span>
          <span className="text-xl font-bold text-indigo-600">5</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm">
          <span className="text-lg font-medium">Functions Plotted:</span>
          <span className="text-xl font-bold text-indigo-600">3</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsSummaryCard;
