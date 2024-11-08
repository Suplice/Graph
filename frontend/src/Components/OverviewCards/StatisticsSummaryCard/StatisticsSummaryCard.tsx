import React, { useEffect, useState } from "react";

interface statistics {
  createdGraphs: number;
  plottedFunctions: number;
  uploadedDataSets: number;
}

const StatisticsSummaryCard: React.FC = () => {
  const [statistics, setStatistics] = useState<statistics>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const id = localStorage.getItem("uid");
        const token = localStorage.getItem("token");

        if (!id || !token) {
          console.error("User ID or token is missing from localStorage.");
          setIsLoading(false);
          return;
        }

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/statistics/getStatistics/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          console.error("Failed to fetch statistics");
          setIsLoading(false);
          return;
        }

        const data: statistics = await res.json();

        setStatistics(data);
        localStorage.setItem("statistics", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!localStorage.getItem("statistics")) {
      fetchData();
    } else {
      setStatistics(JSON.parse(localStorage.getItem("statistics") as string));
    }
  }, []);

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6 w-full h-full border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Statistics Summary
        </h2>

        {isLoading ? (
          <div
            role="status"
            className="max-w-md p-4 space-y-4  border-gray-200 divide-y divide-gray-200 rounded animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div className="space-y-4 text-gray-700">
            <div
              className={`flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm ${isLoading ? "animate-pulse" : ""}`}
            >
              <span className="text-lg font-medium">Created Graphs</span>
              <span className="text-xl font-bold text-indigo-600">
                {statistics?.createdGraphs}
              </span>
            </div>
            <div
              className={`flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm ${isLoading ? "animate-pulse" : ""}`}
            >
              <span className="text-lg font-medium">Uploaded datasets</span>
              <span className="text-xl font-bold text-indigo-600">
                {statistics?.uploadedDataSets}
              </span>
            </div>
            <div
              className={`flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm ${isLoading ? "animate-pulse" : ""}`}
            >
              <span className="text-lg font-medium">Plotted functions</span>
              <span className="text-xl font-bold text-indigo-600">
                {statistics?.plottedFunctions}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StatisticsSummaryCard;
