import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const facts = [
  "Did you know? The term 'bug' in computer science originated from a real bug stuck in a computer.",
  "The first graph ever drawn dates back to the 18th century, created by William Playfair.",
  "Pie charts were invented by William Playfair in 1801.",
  "Data visualization helps humans process information up to 60,000 times faster than text.",
  "The first electronic computer, ENIAC, was built in the 1940s and weighed 27 tons!",
];

const FunFactsCard: React.FC = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-300 rounded-xl shadow-lg p-8 w-full h-full border border-gray-200 flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">Fun Fact</h3>

      <motion.div
        className="text-blue-500 mb-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <svg
          className="w-16 h-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M12 18.5a6.5 6.5 0 116.5-6.5 6.5 6.5 0 01-6.5 6.5z"
          ></path>
        </svg>
      </motion.div>

      <div className="relative w-full  flex items-center justify-center overflow-hidden mb-5 h-36 md:h-24">
        <AnimatePresence>
          <motion.p
            key={currentFactIndex}
            className="text-gray-700 text-lg text-center absolute"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {facts[currentFactIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <motion.div
          className="bg-blue-500 h-2 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          key={currentFactIndex}
        ></motion.div>
      </div>

      <p className="text-gray-500 text-center text-md font-mono">
        Refreshes every 5 seconds with a new fun fact!
      </p>
    </div>
  );
};

export default FunFactsCard;
