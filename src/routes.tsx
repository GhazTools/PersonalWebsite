import React from "react";
import { Route } from "react-router-dom";
import MDTab, { MDTabProps } from "./components/MDTab";
import { PageProps } from "./models";
import Greeter from "./views/Greeter";
import NotFoundView from "./views/NotFoundView";
import staticData from "./data/json/static.json";
import contactData from "./data/json/contact.json";
import pkg from "../package.json";

import { pages, tabs } from "./data/";

type ViewProps = PageProps;
const View: React.FC<ViewProps> = ({ comp: Comp, ...rest }) => {
  return <Comp {...rest} />;
};

type TabProps = MDTabProps;
const Tab: React.FC<TabProps> = ({ fileName }) => {
  return <MDTab fileName={fileName} />;
};

// Home component (not in sidebar but accessible via blue logo button)
const Home = () => (
  <Greeter
    staticData={staticData}
    contactData={contactData}
    repoUrl={pkg.repository.url}
  />
);

export default [
  // Home route (accessible via logo button, not in sidebar)
  <Route path="/" key="home" element={<Home />} />,
  ...pages.map(({ name, url, comp, ...rest }) => (
    <Route path={url} key={name} element={<View comp={comp} {...rest} />} />
  )),
  ...tabs.map(({ name, url, mdFileName, comp }) => (
    <Route
      path={url}
      key={name}
      element={comp ? <View comp={comp} /> : <Tab fileName={mdFileName!} />}
    />
  )),
  <Route key="notfound" path="*" element={<NotFoundView />} />,
];
