/**
 * Resume View - Interactive resume page
 */
import React from "react";
import { motion } from "framer-motion";
import InteractiveResume from "../../components/InteractiveResume";
import type { ResumeConfig } from "../../components/InteractiveResume/types";
import resumeData from "../../data/json/resume.config.json";
import SEO from "../../components/SEO";

const ResumeView: React.FC = () => {
  const config = resumeData as ResumeConfig;

  return (
    <>
      <SEO title="Resume" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <InteractiveResume config={config} />
      </motion.div>
    </>
  );
};

export default ResumeView;
