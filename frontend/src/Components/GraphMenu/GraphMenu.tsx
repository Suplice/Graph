import { getMetadata, getStorage, listAll, ref } from "firebase/storage";
import React, { useEffect } from "react";

interface GraphMenuProps {
  onChange: (selectedTab: string) => void;
}

const extractFileNameAndDate = (fileName: string) => {
  const parts = fileName.split("-");

  const baseName: string = parts.slice(1, -1).join("-").split("+")[0];

  const dateCreated: string =
    parts[1].split("+")[1] + "-" + parts[2] + "-" + parts[3];

  return {
    dateCreated: dateCreated,
    baseName: baseName,
  };
};

const storage = getStorage();

const getUserGraphs = async () => {
  const userId = localStorage.getItem("uid");

  if (!userId) {
    console.error("User not authenticated");
    return;
  }

  try {
    const graphsRef = ref(storage, "graphs/");

    const result = await listAll(graphsRef);

    const userGraphs = await Promise.all(
      result.items
        .filter((item) => item.name.startsWith(userId))
        .map(async (item) => {
          return extractFileNameAndDate(item.name);
        })
    );

    console.log("User graphs:", userGraphs);

    return userGraphs;
  } catch (error) {
    console.error("Error fetching user graphs:", error);
  }
};

const GraphMenu: React.FC<GraphMenuProps> = ({ onChange }) => {
  const [graphs, setGraphs] = React.useState<
    { dateCreated: string; baseName: string }[]
  >([]);

  useEffect(() => {
    getUserGraphs().then((data) => {
      if (data) {
        setGraphs(data);
      }
    });
  }, []);

  const recentGraphs = graphs
    .sort((a, b) => {
      const dateA = new Date(
        (a.dateCreated.split("+").pop() || "").split("-").reverse().join("-")
      );
      const dateB = new Date(
        (b.dateCreated.split("+").pop() || "").split("-").reverse().join("-")
      );

      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 3);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8 space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">Graph Manager</h1>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
          <span className="text-3xl font-semibold text-blue-500">
            {graphs.length}
          </span>
          <span className="text-gray-700">Total Graphs</span>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
          <span className="text-3xl font-semibold text-green-500">2</span>
          <span className="text-gray-700">Active Graphs</span>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
          <span className="text-3xl font-semibold text-purple-500">1</span>
          <span className="text-gray-700">Recently Viewed</span>
        </div>
      </div>

      <button
        className="w-full max-w-4xl px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
        onClick={() => onChange("AddGraphPage")}
      >
        Add New Graph
      </button>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Recently Added Graphs
        </h2>
        <ul className="space-y-4">
          {recentGraphs.map((graph) => (
            <li className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  {graph.baseName}
                </h3>
                <p className="text-sm text-gray-500">
                  Added on: {graph.dateCreated}
                </p>
              </div>
              <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                View
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          All Graphs
        </h2>
        <ul className="space-y-4">
          {graphs.map((graph) => (
            <li className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  {graph.baseName}
                </h3>
                <p className="text-sm text-gray-500">
                  Added on: {graph.dateCreated}
                </p>
              </div>
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                  View
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GraphMenu;
