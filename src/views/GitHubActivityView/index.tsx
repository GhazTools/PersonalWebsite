/**
 * GitHub Activity View - Page wrapper for GitHub activity widget
 */
import React from "react";
import { motion } from "framer-motion";
import GitHubActivity from "../../components/GitHubActivity";
import SEO from "../../components/SEO";

const GitHubActivityView: React.FC = () => {
  return (
    <>
      <SEO
        title="GitHub Activity"
        description="Recent GitHub contributions, repositories, and open source activity."
        pathname="/github"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <GitHubActivity
          config={{
            username: "GhazanfarShahbaz",
            maxRepos: 6,
            maxEvents: 8,
          }}
        />
      </motion.div>
    </>
  );
};

export default GitHubActivityView;
