import React from "react";

interface GraphMenmProps {
  onChange: (selectedTab: string) => void;
}

const GraphMenu: React.FC<GraphMenmProps> = ({ onChange }) => {
  const graphs = [
    { id: 1, name: "Revenue Analysis", dateAdded: "2024-10-15" },
    { id: 2, name: "Market Trends", dateAdded: "2024-10-18" },
    { id: 3, name: "User Growth", dateAdded: "2024-10-20" },
  ];

  const recentGraphs = graphs.slice(0, 3);

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
            <li
              key={graph.id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  {graph.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Added on: {graph.dateAdded}
                </p>
              </div>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                onClick={() => console.log(`View Graph ${graph.id}`)}
              >
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
            <li
              key={graph.id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  {graph.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Added on: {graph.dateAdded}
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  onClick={() => console.log(`View Graph ${graph.id}`)}
                >
                  View
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  onClick={() => console.log(`Delete Graph ${graph.id}`)}
                >
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
