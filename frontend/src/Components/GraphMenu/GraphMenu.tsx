import {
  getMetadata,
  getStorage,
  listAll,
  ref,
  deleteObject,
} from "firebase/storage";
import React, { useEffect } from "react";
import { useMenuRoute } from "../../Context/MenuRouteContext";
import { useAuth } from "../../Context/AuthContext";
import { useGraphData } from "../../Context/GraphDataContext";
import { motion } from "framer-motion";

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

const GraphMenu: React.FC<GraphMenuProps> = ({ onChange }) => {
  const [graphs, setGraphs] = React.useState<
    { dateCreated: string; baseName: string }[]
  >([]);

  const { userId } = useAuth();
  const {
    newGraphs,
    setViewGraphData,
    setRecentlyViewedGraphsLocally,
    recentlyViewedGraphs,
  } = useGraphData();

  useEffect(() => {
    getUserGraphs().then((data) => {
      if (data) {
        setGraphs(data);
      }
    });
  }, []);

  const storage = getStorage();

  const getUserGraphs = async () => {
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

      return userGraphs;
    } catch (error) {
      console.error("Error fetching user graphs:", error);
    }
  };

  const deleteGraph = async (
    graphName: string,
    dateCreated: string,
    id: number
  ) => {
    const graphRef = ref(
      storage,
      `graphs/${userId}-${graphName}+${dateCreated}`
    );

    try {
      await deleteObject(graphRef);
      const newGraphs = graphs.filter((_, index) => index !== id);
      setGraphs(newGraphs);
    } catch (error) {
      console.error("Error deleting graph:", error);
    }
  };

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
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8 space-y-8">
      <motion.h1
        className="text-4xl font-bold text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Graph Manager
      </motion.h1>

      <motion.div
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4"
        initial="hidden"
        animate="visible"
        variants={listVariants}
      >
        <motion.div
          className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center"
          variants={cardVariants}
        >
          <span className="text-3xl font-semibold text-blue-500">
            {graphs.length}
          </span>
          <span className="text-gray-700">Total Graphs</span>
        </motion.div>

        <motion.div
          className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center"
          variants={cardVariants}
        >
          <span className="text-3xl font-semibold text-green-500">
            {newGraphs}
          </span>
          <span className="text-gray-700">New Graphs</span>
        </motion.div>

        <motion.div
          className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center"
          variants={cardVariants}
        >
          <span className="text-3xl font-semibold text-purple-500">
            {recentlyViewedGraphs}
          </span>
          <span className="text-gray-700">Recently Viewed</span>
        </motion.div>
      </motion.div>

      <motion.button
        className="w-full max-w-4xl px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
        onClick={() => onChange("AddGraphPage")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add New Graph
      </motion.button>

      <motion.div
        className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Recently Added Graphs
        </h2>
        <motion.ul
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={listVariants}
        >
          {recentGraphs.map((graph, id) => (
            <motion.li
              key={id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm md:flex-row flex-col gap-2 md:gap-0"
              variants={cardVariants}
            >
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  {graph.baseName}
                </h3>
                <p className="text-sm text-gray-500">
                  Added on: {graph.dateCreated}
                </p>
              </div>
              <button
                onClick={() => {
                  onChange("ViewGraph");
                  setRecentlyViewedGraphsLocally(
                    localStorage.getItem("recentlyViewedGraphs")
                      ? Number(localStorage.getItem("recentlyViewedGraphs")) + 1
                      : 1
                  );
                  setViewGraphData({
                    baseName: graph.baseName,
                    dateCreated: graph.dateCreated,
                  });
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                View
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div
        className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          All Graphs
        </h2>
        <motion.ul
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={listVariants}
        >
          {graphs.map((graph, id) => (
            <motion.li
              key={id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm flex-col md:flex-row gap-2 md:gap-0"
              variants={cardVariants}
            >
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  {graph.baseName}
                </h3>
                <p className="text-sm text-gray-500">
                  Added on: {graph.dateCreated}
                </p>
              </div>
              <div className="flex md:space-x-4 flex-col md:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    onChange("ViewGraph");
                    setRecentlyViewedGraphsLocally(
                      localStorage.getItem("recentlyViewedGraphs")
                        ? Number(localStorage.getItem("recentlyViewedGraphs")) +
                            1
                        : 1
                    );
                    setViewGraphData({
                      baseName: graph.baseName,
                      dateCreated: graph.dateCreated,
                    });
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition w-24"
                >
                  View
                </button>
                <button
                  onClick={() =>
                    deleteGraph(graph.baseName, graph.dateCreated, id)
                  }
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition w-24"
                >
                  Delete
                </button>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default GraphMenu;
