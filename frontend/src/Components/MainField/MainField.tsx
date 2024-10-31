import React from "react";

interface MainFieldProps {
  selectedTab: string;
}

const MainField: React.FC<MainFieldProps> = ({ selectedTab }) => {
  return (
    <div className="w-5/6 p-10 m-6 ml-0 bg-[#FFFFFF] rounded-lg border-2 border-gray-300">
      {selectedTab === "graphs" && <h1>this is graphs page</h1>}
      <h1>this is main field</h1>
    </div>
  );
};

export default MainField;
