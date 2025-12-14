/**
 * NavBar component - Modern tab bar with sleek design
 */
import React from "react";
import { Box, useTheme } from "@mui/material";
import NavItem from "./NavItem";
import { TabProps } from "../../..";

const Navbar: React.FC<TabProps> = ({ tabs }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        gap: 0.25,
        mx: 2,
        // Scrollable on overflow
        overflowX: "auto",
        overflowY: "hidden",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: 32,
          borderRadius: 2,
          backgroundColor: isDark
            ? "rgba(0, 0, 0, 0.2)"
            : "rgba(0, 0, 0, 0.04)",
          padding: "2px",
        }}
      >
        {tabs.map((tab) => (
          <NavItem key={tab.name} {...tab} />
        ))}
      </Box>
    </Box>
  );
};

export default Navbar;
