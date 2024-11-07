import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { motion } from "framer-motion";

Chart.register(...registerables);
const FunctionPlotter: React.FC = () => {
  const [functionInput, setFunctionInput] = useState<string>("");
  const [graphData, setGraphData] = useState<{
    labels: number[];
    data: number[];
  }>({
    labels: [],
    data: [],
  });

  const generateGraphData = (func: string) => {
    const xValues = Array.from({ length: 100 }, (_, i) => i - 50);
    const yValues = xValues.map((x) => {
      try {
        return eval(func.replace(/x/g, x.toString()));
      } catch (error) {
        return null;
      }
    });

    const validData = yValues.map((y, index) => (y !== null ? y : 0));
    setGraphData({
      labels: xValues,
      data: validData,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setFunctionInput(input);

    if (input.replace(/\s\t]+/g, "").substring(0, 2) === "y=") {
      generateGraphData(input.substring(2));
    } else if (input) {
      generateGraphData(input);
    } else {
      setGraphData({ labels: [], data: [] });
    }
  };

  const data = {
    labels: graphData.labels,
    datasets: [
      {
        label: "Function",
        data: graphData.data,
        fill: false,
        borderColor: "rgba(75,150,192,1)",
        tension: 0.05,
      },
    ],
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-8 w-full h-full "
      initial={{ opacity: 0.0 }}
      animate={{ opacity: 1.0, transition: { duration: 0.7 } }}
      exit={{ opacity: 0.0 }}
    >
      <h2 className="font-bold text-3xl text-gray-800 text-center">
        Function Plotter
      </h2>
      <p className="text-gray-600 mt-2 text-xl font-sans text-center">
        Plot your mathematical functions below.
      </p>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter a function, e.g., x+2"
          className="w-full p-3 border border-gray-300 rounded-lg  outline-none ring-0 focus:border-black transition duration-200 text-gray-700 placeholder-gray-400"
          value={functionInput}
          onChange={handleInputChange}
        />
      </div>

      <div className="w-full h-[700px] mt-6">
        {graphData.labels.length > 0 && (
          <Line
            data={data}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        )}
        {graphData.labels.length === 0 && (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-lg font-medium border border-dashed border-gray-300">
            Graph Preview Area
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FunctionPlotter;
