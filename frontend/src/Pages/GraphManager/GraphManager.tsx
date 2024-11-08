import React, { useState } from "react";
import GraphMenu from "../../Components/GraphMenu/GraphMenu";
import AddGraph from "../../Components/AddGraph/AddGraph";

function GraphManager() {
  const [selectedTab, setSelectedTab] = useState("");

  const selectedComponent = () => {
    switch (selectedTab) {
      case "AddGraphPage":
        return <AddGraph onChange={setSelectedTab} />;
      default:
        return <GraphMenu onChange={setSelectedTab} />;
    }
  };

  return selectedComponent();
}

export default GraphManager;
