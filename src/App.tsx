import React from "react";
import { Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainLayout from "./layouts/Main";
import routes from "./routes";

import { tabs } from "./data";
import contactData from "./data/json/contact.json";

const App: React.FC = () => {
  const location = useLocation();

  return (
    <MainLayout tabs={tabs} contactData={contactData}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {routes}
        </Routes>
      </AnimatePresence>
    </MainLayout>
  );
};

export default App;
