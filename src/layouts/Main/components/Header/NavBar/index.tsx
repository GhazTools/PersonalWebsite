/**
 * NavBar component - Modernized with MUI
 */
import React from "react";
import { Box } from "@mui/material";
import NavItem from "./NavItem";
import { TabProps } from "../../..";

const Navbar: React.FC<TabProps> = ({ tabs }) => {
  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        height: "100%",
      }}
    >
      {tabs.map((tab) => (
        <NavItem key={tab.name} {...tab} />
      ))}
    </Box>
  );
};

export default Navbar;
