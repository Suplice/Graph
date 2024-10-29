import React from "react";

interface MainFieldProps {
  selectedTab: string;
}

const MainField: React.FC<MainFieldProps> = ({ selectedTab }) => {
  return (
    <div className="w-4/5 p-10 m-8 border-2 bg-[#f5efd6] rounded-lg border-black">
      {selectedTab === "graphs" && <h1>this is graphs page</h1>}
      <h1>this is main field</h1>
    </div>
  );
};

export default MainField;
