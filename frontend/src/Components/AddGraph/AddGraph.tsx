import React from "react";

interface AddGraphProps {
  onChange: (selectedTab: string) => void;
}

const AddGraph: React.FC<AddGraphProps> = ({ onChange }) => {
  return <button onClick={() => onChange("")}>dadad</button>;
};

export default AddGraph;
