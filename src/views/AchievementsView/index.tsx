/**
 * Achievements View - Page wrapper for Awards & Achievements
 */
import React from "react";
import { motion } from "framer-motion";
import Achievements from "../../components/Achievements";
import type { AchievementsConfig } from "../../components/Achievements/types";
import achievementsData from "../../data/json/achievements.json";
import SEO from "../../components/SEO";

const AchievementsView: React.FC = () => {
  const config = achievementsData as AchievementsConfig;

  return (
    <>
      <SEO
        title="Awards & Achievements"
        description="Professional awards, certifications, hackathon wins, and notable achievements."
        pathname="/achievements"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Achievements config={config} />
      </motion.div>
    </>
  );
};

export default AchievementsView;
