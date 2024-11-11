import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-3xl font-semibold text-gray-700 mb-6"
      >
        Loading...
      </motion.h1>

      <motion.div
        className="w-16 h-16 border-4 border-gray-300 border-t-4 border-t-blue-500 rounded-full mb-6"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      ></motion.div>

      <motion.div
        className="text-3xl text-blue-500"
        animate={{ x: [0, 20, 0] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        •
      </motion.div>
    </div>
  );
};

export default Loading;
