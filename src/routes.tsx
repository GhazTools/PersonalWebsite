import React from "react";
import { Route, Navigate } from "react-router-dom";
import MDTab, { MDTabProps } from "./components/MDTab";
import { PageProps } from "./models";

import { pages, tabs } from "./data/";

type ViewProps = PageProps;
const View: React.FC<ViewProps> = ({ comp: Comp, ...rest }) => {
  return <Comp {...rest} />;
};

type TabProps = MDTabProps;
const Tab: React.FC<TabProps> = ({ fileName }) => {
  return <MDTab fileName={fileName} />;
};

export default [
  ...pages.map(({ name, url, comp, ...rest }) => (
    <Route path={url} key={name} element={<View comp={comp} {...rest} />} />
  )),
  ...tabs.map(({ name, url, mdFileName }) => (
    <Route path={url} key={name} element={<Tab fileName={mdFileName} />} />
  )),
  <Route key="notfound" path="*" element={<Navigate to="/" replace />} />,
];
