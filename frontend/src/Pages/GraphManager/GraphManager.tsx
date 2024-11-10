import React, { useState } from "react";
import GraphMenu from "../../Components/GraphMenu/GraphMenu";
import AddGraph from "../../Components/AddGraph/AddGraph";
import ViewGraph from "../../Components/viewGraph/viewGraph";

function GraphManager() {
  const [selectedTab, setSelectedTab] = useState("");

  const selectedComponent = () => {
    switch (selectedTab) {
      case "AddGraphPage":
        return <AddGraph onChange={setSelectedTab} />;
      case "ViewGraph":
        return <ViewGraph onChange={setSelectedTab} />;
      default:
        return <GraphMenu onChange={setSelectedTab} />;
    }
  };

  return selectedComponent();
}

export default GraphManager;
