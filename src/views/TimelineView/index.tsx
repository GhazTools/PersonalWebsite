/**
 * Timeline view - Showcasing journey/milestones with Apple-inspired animations
 */
import React from "react";
import { motion } from "framer-motion";
import Timeline from "../../components/Timeline";
import type { TimelineConfig } from "../../components/Timeline/types";
import timelineData from "../../data/json/timeline.json";

const TimelineView: React.FC = () => {
  // Type assertion for the imported JSON
  const config = timelineData as TimelineConfig;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Timeline config={config} />
    </motion.div>
  );
};

export default TimelineView;
