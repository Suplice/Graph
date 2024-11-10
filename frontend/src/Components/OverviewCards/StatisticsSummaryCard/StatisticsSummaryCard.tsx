import React, { useEffect, useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { useGraphData } from "../../../Context/GraphDataContext";

const StatisticsSummaryCard: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { userId, token } = useAuth();
  const { plottedFunctions, uploadedDataSets, createdGraphs } = useGraphData();

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
                {createdGraphs}
              </span>
            </div>
            <div
              className={`flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm ${isLoading ? "animate-pulse" : ""}`}
            >
              <span className="text-lg font-medium">Uploaded datasets</span>
              <span className="text-xl font-bold text-indigo-600">
                {uploadedDataSets}
              </span>
            </div>
            <div
              className={`flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm ${isLoading ? "animate-pulse" : ""}`}
            >
              <span className="text-lg font-medium">Plotted functions</span>
              <span className="text-xl font-bold text-indigo-600">
                {plottedFunctions}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StatisticsSummaryCard;
