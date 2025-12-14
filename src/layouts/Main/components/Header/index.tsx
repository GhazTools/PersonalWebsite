/**
 * Header component - Modernized with MUI
 */
import React from "react";
import { Box, useTheme } from "@mui/material";
import NavBar from "./NavBar";
import { TabProps } from "../..";

const Header: React.FC<TabProps> = ({ tabs }) => {
  const theme = useTheme();

  return (
    <Box
      component="header"
      sx={{
        height: 40,
        backgroundColor: "rgba(33, 37, 43, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        display: "flex",
        alignItems: "center",
        position: "sticky",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: theme.zIndex.appBar,
      }}
    >
      <NavBar tabs={tabs} />
    </Box>
  );
};

export default Header;
