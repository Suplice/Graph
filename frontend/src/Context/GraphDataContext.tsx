import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

interface statistics {
  createdGraphs: number;
  plottedFunctions: number;
  uploadedDataSets: number;
}

interface GraphDataContextType {
  createdGraphs: number;
  setCreatedGraphs: (value: number) => void;

  uploadedDataSets: number;
  setUploadedDataSets: (value: number) => void;

  newGraphs: number;
  setNewGraphs: (value: number) => void;
  setNewGraphsLocally: (value: number) => void;

  recentlyViewedGraphs: number;
  setRecentlyViewedGraphsLocally: (value: number) => void;
  setRecentlyViewedGraphs: (value: number) => void;

  plottedFunctions: number;
  setPlottedFunctions: (value: number) => void;

  viewGraphData: { baseName: string; dateCreated: string };
  setViewGraphData: (value: { baseName: string; dateCreated: string }) => void;
}

const GraphDataContext = React.createContext<GraphDataContextType | undefined>(
  undefined
);

export const GraphDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [createdGraphs, setCreatedGraphs] = useState<number>(0);

  const [uploadedDataSets, setUploadedDataSets] = useState<number>(0);

  const [plottedFunctions, setPlottedFunctions] = useState<number>(0);

  const [viewGraphData, setViewGraphData] = useState<{
    baseName: string;
    dateCreated: string;
  }>({ baseName: "", dateCreated: "" });

  const [newGraphs, setNewGraphs] = useState<number>(
    Number(localStorage.getItem("newGraphs")) | 0
  );

  const [recentlyViewedGraphs, setRecentlyViewedGraphs] = useState<number>(
    Number(localStorage.getItem("recentlyViewedGraphs")) | 0
  );

  const setNewGraphsLocally = (value: number) => {
    localStorage.setItem("newGraphs", value.toString());
    setNewGraphs(value);
  };

  const setRecentlyViewedGraphsLocally = (value: number) => {
    localStorage.setItem("recentlyViewedGraphs", value.toString());
    setRecentlyViewedGraphs(value);
  };

  const { token, userId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/statistics/getStatistics/${userId}`,
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
          return;
        }

        const data: statistics = await res.json();

        setCreatedGraphs(data.createdGraphs);
        setPlottedFunctions(data.plottedFunctions);
        setUploadedDataSets(data.uploadedDataSets);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <GraphDataContext.Provider
      value={{
        createdGraphs,
        setCreatedGraphs,
        uploadedDataSets,
        setUploadedDataSets,
        newGraphs,
        setNewGraphs,
        setNewGraphsLocally,
        plottedFunctions,
        setPlottedFunctions,
        viewGraphData,
        setViewGraphData,
        recentlyViewedGraphs,
        setRecentlyViewedGraphs,
        setRecentlyViewedGraphsLocally,
      }}
    >
      {children}
    </GraphDataContext.Provider>
  );
};

export const useGraphData = (): GraphDataContextType => {
  const context = useContext(GraphDataContext);

  if (context === undefined) {
    throw new Error("useGraphData must be used within a GraphDataProvider");
  }

  return context;
};
