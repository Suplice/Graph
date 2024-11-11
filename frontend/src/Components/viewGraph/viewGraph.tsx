import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useAuth } from "../../Context/AuthContext";
import { useGraphData } from "../../Context/GraphDataContext";
import { motion } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface AddGraphProps {
  onChange: (selectedTab: string) => void;
}

const getFormattedDate = () => {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const ViewGraph: React.FC<AddGraphProps> = ({ onChange }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messageColor, setMessageColor] = useState<"red" | "green">("red");

  const { userId, token } = useAuth();

  const { viewGraphData } = useGraphData();

  const [data, setData] = useState<{ name: string; value: number }[]>([
    {
      name: "",
      value: 0,
    },
  ]);

  const [graphType, setGraphType] = useState("empty");
  const [chartData, setChartData] = useState<any>(null);

  const handleDataChange = (
    index: number,
    field: "name" | "value",
    value: string | number
  ) => {
    const updatedData = [...data];
    updatedData[index] = {
      ...updatedData[index],
      [field]: field === "value" ? Number(value) : value,
    };
    setData(updatedData);
    updateChartData(updatedData);
  };

  const createAndUploadCSV = async (
    fileName: string,
    formattedDate: string,
    userId?: string
  ) => {
    const headers = "name,value\n";
    const csvRows = data.map((item) => `${item.name},${item.value}`).join("\n");
    const csvContent = headers + csvRows;
    const csvBlob = new Blob([csvContent], { type: "text/csv" });

    const dataRef = ref(
      storage,
      "graphs/" + userId + "-" + fileName + "+" + formattedDate
    );

    await uploadBytes(dataRef, csvBlob);
  };

  const handleGraphTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setGraphType(event.target.value);
    updateChartData(data);
  };

  const updateChartData = (data: { name: string; value: number }[]) => {
    setChartData({
      labels: data.map((d) => d.name),
      datasets: [
        {
          label: "Values",
          data: data.map((d) => d.value),
          backgroundColor: [
            "#3b82f6",
            "#f59e0b",
            "#10b981",
            "#ef4444",
            "#6366f1",
          ],
        },
      ],
    });
  };

  const addDataField = () => {
    setData([...data, { name: "", value: 0 }]);
  };

  const removeDataField = (index: number) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    updateChartData(updatedData);
  };

  const handleApplyChangesToGraph = async () => {
    try {
      if (data.length > 0) {
        const formattedDate = getFormattedDate();
        await createAndUploadCSV(
          viewGraphData.baseName,
          formattedDate,
          userId || undefined
        );
        setMessage("Data updated successfully!");
        setMessageColor("green");
        setIsMessageVisible(true);
        setTimeout(() => onChange("overview"), 2000);
      } else {
        setMessage("Graph must consist of atleast one data field!");
        setMessageColor("red");
        setIsMessageVisible(true);
      }
    } catch (error) {
      console.error("Error uploading data to Firebase Storage:", error);
      setMessage("Error saving graph data!");
      setMessageColor("red");
      setIsMessageVisible(true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.02, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  useEffect(() => {
    const getGraphData = async () => {
      console.log(viewGraphData);

      setIsLoading(true);
      const filePath = `graphs/${userId}-${viewGraphData.baseName}+${viewGraphData.dateCreated}`;

      console.log(filePath);
      const storageRef = ref(storage, filePath);

      try {
        const url = await getDownloadURL(storageRef);

        const response = await fetch(url, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!response.ok) {
          throw new Error(`Error fetching file: ${response.statusText}`);
        }

        const csvText = await response.text();
        const parsedData = Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
        });

        const graphData = parsedData.data as { name: string; value: number }[];
        setData(graphData);
        updateChartData(graphData);
      } catch (error) {
        console.error("Error fetching graph data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getGraphData();
  }, []);

  return (
    <>
      <div className="h-full bg-gray-100 flex flex-col items-center justify-center">
        <div className="w-full bg-gray-100 flex justify-center">
          <h1 className="text-xl font-bold">{viewGraphData.baseName}</h1>
        </div>
        <motion.div
          className=" bg-gray-100 flex flex-col items-center justify-center p-6 w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8 h-[650px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Enter Data
              </h2>
              <motion.div
                className="space-y-4 overflow-auto h-[200px] px-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {isLoading ? (
                  <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  data.map((entry, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                    >
                      <input
                        type="text"
                        className="p-2 border rounded w-1/2"
                        placeholder="Name"
                        value={entry.name}
                        onChange={(e) =>
                          handleDataChange(index, "name", e.target.value)
                        }
                      />
                      <input
                        type="number"
                        className="p-2 border rounded w-1/2"
                        placeholder="Value"
                        value={entry.value}
                        onChange={(e) =>
                          handleDataChange(index, "value", e.target.value)
                        }
                      />
                      <button
                        onClick={() => removeDataField(index)}
                        className="text-red-500 font-bold"
                      >
                        X
                      </button>
                    </motion.div>
                  ))
                )}
              </motion.div>
              <motion.button
                onClick={addDataField}
                className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                whileHover={buttonVariants.hover}
                whileTap={buttonVariants.tap}
              >
                Add Row
              </motion.button>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Graph Settings
              </h2>
              <label className="block text-sm font-medium text-gray-700">
                Select Graph Type
              </label>
              <select
                className="w-full p-2 border rounded"
                value={graphType}
                onChange={handleGraphTypeChange}
              >
                <option value="none">empty</option>
                <option value="pie">Pie Chart</option>
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
              </select>

              <motion.div
                className="mt-6 bg-gray-100 p-4 rounded-lg shadow-inner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {chartData && graphType === "pie" && <Pie data={chartData} />}
                {chartData && graphType === "bar" && <Bar data={chartData} />}
                {chartData && graphType === "line" && <Line data={chartData} />}
              </motion.div>
            </div>
          </motion.div>

          <div className="mt-8 flex gap-4">
            <motion.button
              onClick={() => onChange("overview")}
              className="bg-red-500 text-white py-2 px-6 rounded"
              whileHover={buttonVariants.hover}
              whileTap={buttonVariants.tap}
            >
              Cancel
            </motion.button>
            <motion.button
              onClick={handleApplyChangesToGraph}
              className="bg-green-500 text-white py-2 px-6 rounded"
              whileHover={buttonVariants.hover}
              whileTap={buttonVariants.tap}
            >
              Apply Changes
            </motion.button>
          </div>
        </motion.div>
        <ErrorMessage
          isVisible={isMessageVisible}
          onClose={() => setIsMessageVisible(false)}
          duration={2000}
          message={message}
          color={messageColor}
        />
      </div>
    </>
  );
};

export default ViewGraph;
