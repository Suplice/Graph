import React, { useEffect, useRef, useState } from "react";
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
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getMetadata,
} from "firebase/storage";
import { storage } from "../../firebaseConfig";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useAuth } from "../../Context/AuthContext";
import { useGraphData } from "../../Context/GraphDataContext";
import { debounceSendStatisticsToBackend } from "../../utils/APIcalls/debouncer";
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

const AddGraph: React.FC<AddGraphProps> = ({ onChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [fileName, setFileName] = useState<string>("");

  const [nameExists, setNameExists] = useState<boolean>(false);

  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messageColor, setMessageColor] = useState<"red" | "green">("red");

  const { userId, token } = useAuth();

  const {
    newGraphs,
    setNewGraphsLocally,
    createdGraphs,
    setCreatedGraphs,
    uploadedDataSets,
    setUploadedDataSets,
    plottedFunctions,
  } = useGraphData();

  const [data, setData] = useState<{ name: string; value: number }[]>([
    {
      name: "Test Data",
      value: 10,
    },
  ]);

  const [graphType, setGraphType] = useState("");
  const [chartData, setChartData] = useState<any>(null);

  const incrementNewGraphsCount = () => {
    setCreatedGraphs(createdGraphs + 1);
    setNewGraphsLocally(newGraphs + 1);
    console.log(createdGraphs);
  };

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedData = results.data.map((row: any) => ({
            name: row["name"],
            value: parseFloat(row["value"]),
          }));
          setData(parsedData);
          updateChartData(parsedData);
        },
        error: (error) => {
          console.error("Error parsing CSV file:", error);
        },
      });
    }
    setUploadedDataSets(uploadedDataSets + 1);
  };

  const handleAddGraph = async () => {
    setNameExists(false);
    try {
      const file = fileInputRef.current?.files?.[0];

      if (data.length > 0) {
        const formattedDate = getFormattedDate();

        const storageRef = ref(
          storage,
          "graphs/" + userId + "-" + fileName + "+" + formattedDate
        );
        try {
          await getMetadata(storageRef);
          setNameExists(true);
          setMessage("File name already exists");
          setMessageColor("red");
          setIsMessageVisible(true);
        } catch (error) {
          if (file) {
            uploadBytesResumable(storageRef, file).then(() => {
              console.log("uploaded file");
            });
          } else {
            createAndUploadCSV(fileName, formattedDate, userId || undefined);
          }

          incrementNewGraphsCount();
          setMessage("Graph created successfully!");
          setMessageColor("green");
          setIsMessageVisible(true);
          setTimeout(() => onChange("overview"), 2000);
        }
      }
    } catch (error) {
      console.error("Error uploading data to Firebase Storage:", error);
      setMessage("Error saving graph data!");
      setMessageColor("red");
      setIsMessageVisible(true);
    }
  };

  useEffect(() => {
    debounceSendStatisticsToBackend(
      createdGraphs,
      uploadedDataSets,
      plottedFunctions,
      userId,
      token
    );
  }, [createdGraphs, uploadedDataSets, plottedFunctions]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.02, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="h-[1000px] w-full bg-gray-100 flex flex-col items-center justify-center p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 lg:grid-cols-2 gap-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Enter Data</h2>
          <motion.div
            className="space-y-4 overflow-auto h-[200px] px-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {data.map((entry, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
              >
                <input
                  type="text"
                  className="p-2 border rounded w-full md:w-1/2"
                  placeholder="Name"
                  value={entry.name}
                  onChange={(e) =>
                    handleDataChange(index, "name", e.target.value)
                  }
                />
                <input
                  type="number"
                  className="p-2 border rounded w-full md:w-1/2"
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
            ))}
          </motion.div>
          <motion.button
            onClick={addDataField}
            className="bg-blue-500 text-white py-2 px-4 rounded w-full"
            whileHover={buttonVariants.hover}
            whileTap={buttonVariants.tap}
          >
            Add Row
          </motion.button>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Upload CSV
            </label>
            <input
              placeholder="Choose File"
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="mt-1 inline-block hover:cursor-pointer text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
          </div>

          <div className="flex flex-col md:flex-row md:justify-between gap-3 pt-10">
            <label className="text-lg font-semibold">Enter File Name:</label>
            <div className="flex flex-col">
              <input
                type="text"
                className={`w-full md:w-60 border p-2 rounded ${nameExists ? "border-red-500" : ""}`}
                value={fileName}
                onChange={(event) => {
                  setFileName(event.target.value);
                }}
              />
              {nameExists && (
                <label className="text-sm text-red-600 px-1">
                  file name already exists
                </label>
              )}
            </div>
          </div>
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
          onClick={handleAddGraph}
          className="bg-green-500 text-white py-2 px-6 rounded"
          whileHover={buttonVariants.hover}
          whileTap={buttonVariants.tap}
        >
          Add Graph
        </motion.button>
      </div>

      <ErrorMessage
        isVisible={isMessageVisible}
        onClose={() => setIsMessageVisible(false)}
        duration={2000}
        message={message}
        color={messageColor}
      />
    </motion.div>
  );
};

export default AddGraph;
