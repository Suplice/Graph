import React from "react";
import GraphTypesCard from "../OverviewCards/GraphTypesCard/GraphTypesCard";
import QuickStartGuideCard from "../OverviewCards/QuickStartGuideCard/QuickStartGuideCard";
import StatisticsSummaryCard from "../OverviewCards/StatisticsSummaryCard/StatisticsSummaryCard";
import FunctionPlotterPreviewCard from "../OverviewCards/FunctionPlotterPreviewCard/FunctionPlotterPreviewCard";
import "./Overview.css";
import { motion } from "framer-motion";
import FunFactsCard from "../OverviewCards/RecentUploadsCard/FunFactsCard";
import GraphDesignTipsCard from "../OverviewCards/FavoriteGraphsCard/GraphDesignTipsCard";

const Overview: React.FC = () => {
  return (
    <div className="grid-container ">
      <motion.div
        className="recent-uploads"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FunFactsCard />
      </motion.div>
      <motion.div
        className="graph-types"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GraphTypesCard />
      </motion.div>
      <motion.div
        className="favorite-graphs"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GraphDesignTipsCard />
      </motion.div>
      <motion.div
        className="quick-start-guide"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <QuickStartGuideCard />
      </motion.div>
      <motion.div
        className="statistics-summary"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StatisticsSummaryCard />
      </motion.div>
      <motion.div
        className="function-plotter-preview"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FunctionPlotterPreviewCard />
      </motion.div>
    </div>
  );
};

export default Overview;
