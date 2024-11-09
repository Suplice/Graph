import React, { useRef, useState } from "react";
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
  getDownloadURL,
  uploadBytesResumable,
  getMetadata,
} from "firebase/storage";
import { storage } from "../../firebaseConfig";

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

  const day = String(date.getDate()).padStart(2, "0"); // Ensure 2-digit day
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit month (0-indexed)
  const year = date.getFullYear(); // Get the full year

  return `${day}-${month}-${year}`; // Format as DD-MM-YYYY
};

const AddGraph: React.FC<AddGraphProps> = ({ onChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [fileName, setFileName] = useState<string>("");

  const [nameExists, setNameExists] = useState<boolean>(false);

  const [data, setData] = useState<{ name: string; value: number }[]>([
    {
      name: "Test Data",
      value: 10,
    },
  ]);
  const [graphType, setGraphType] = useState("pie");
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
  };

  const handleAddGraph = async () => {
    setNameExists(false);
    try {
      const file = fileInputRef.current?.files?.[0];
      const userId = localStorage.getItem("uid");

      if (file) {
        const formattedDate = getFormattedDate();

        const storageRef = ref(
          storage,
          "graphs/" + userId + "-" + fileName + "+" + formattedDate
        );
        try {
          await getMetadata(storageRef);
          alert("Error saving graph data!");
          setNameExists(true);
        } catch (error) {
          uploadBytesResumable(storageRef, file).then(() => {
            console.log("uploaded file");
          });
          alert("Graph data saved successfully!");
        }
      }
    } catch (error) {
      console.error("Error uploading data to Firebase Storage:", error);
      alert("Error saving graph data!");
    }
  };

  return (
    <div className="h-full bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8 h-[650px]">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Enter Data</h2>
          <div className="space-y-4 overflow-auto h-[200px] px-3">
            {data.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
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
              </div>
            ))}
          </div>
          <button
            onClick={addDataField}
            className="bg-blue-500 text-white py-2 px-4 rounded w-full"
          >
            Add Data
          </button>

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
              className="mt-1 inline-block hover:cursor-pointer file:hover:cursor-pointer   text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
          </div>
          <div className="flex flex-row  justify-center gap-3 pt-10">
            <label className="text-lg font-semibold">Enter File Name:</label>
            <div className="flex flex-col ">
              <input
                type="text"
                className={`w-30 h-7 border p-2 rounded ${nameExists ? "border-red-500" : ""}`}
                value={fileName}
                onChange={(event) => {
                  setFileName(event.target.value);
                  console.log(fileName);
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

          <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-inner">
            {chartData && graphType === "pie" && <Pie data={chartData} />}
            {chartData && graphType === "bar" && <Bar data={chartData} />}
            {chartData && graphType === "line" && <Line data={chartData} />}
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => onChange("overview")}
          className="bg-red-500 text-white py-2 px-6 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleAddGraph}
          className="bg-green-500 text-white py-2 px-6 rounded"
        >
          Add Graph
        </button>
      </div>
    </div>
  );
};

export default AddGraph;
