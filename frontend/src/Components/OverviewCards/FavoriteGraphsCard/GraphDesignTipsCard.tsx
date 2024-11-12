import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const graphTips = [
  "Use contrasting colors to make your graph elements stand out.",
  "Always label your axes for clarity.",
  "Keep your graphs simple and avoid clutter.",
  "Use a legend to explain your graph data if there are multiple data series.",
  "Choose the right graph type for your data (e.g., bar for comparisons, line for trends).",
];

const GraphDesignTipsCard: React.FC = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % graphTips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-slate-300 rounded-xl shadow-lg p-6 w-full h-full border border-gray-200 flex flex-col items-center justify-center">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">
        Graph Design Tip
      </h3>

      <div className="relative w-full flex items-center justify-center h-32 md:h-24 ">
        <AnimatePresence>
          <motion.p
            key={currentTipIndex}
            className="text-gray-700 text-lg text-center absolute"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {graphTips[currentTipIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <button
        className="bg-blue-500 text-white py-2 px-6 rounded-md font-semibold hover:bg-blue-600 transition mt-4"
        onClick={() => alert("More tips coming soon!")}
      >
        More Tips
      </button>
    </div>
  );
};

export default GraphDesignTipsCard;
