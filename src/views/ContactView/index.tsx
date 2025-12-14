/**
 * Contact View - Page wrapper for Contact section
 */
import React from "react";
import { motion } from "framer-motion";
import Contact from "../../components/Contact";
import SEO from "../../components/SEO";

const ContactView: React.FC = () => {
  return (
    <>
      <SEO title="Contact" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Contact email="ghazanfarshahbaz2409@gmail.com" />
      </motion.div>
    </>
  );
};

export default ContactView;
