import React from "react";
import { Routes } from "react-router-dom";
import MainLayout from "./layouts/Main";
import routes from "./routes";

import { tabs } from "./data";
import contactData from "./data/json/contact.json";

const App: React.FC = () => (
  <MainLayout tabs={tabs} contactData={contactData}>
    <Routes>{routes}</Routes>
  </MainLayout>
);

export default App;
