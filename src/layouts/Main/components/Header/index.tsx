/**
 * Header component - Modernized with MUI
 */
import React from "react";
import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBar from "./NavBar";
import { TabProps } from "../..";

export interface HeaderProps extends TabProps {
  onMobileMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ tabs, onMobileMenuToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      component="header"
      sx={{
        height: 40,
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(33, 37, 43, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255, 255, 255, 0.05)"
            : "1px solid rgba(0, 0, 0, 0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: theme.zIndex.appBar,
        px: 1,
      }}
    >
      {isMobile && (
        <IconButton
          onClick={onMobileMenuToggle}
          sx={{
            color: theme.palette.text.secondary,
            "&:hover": {
              color: theme.palette.primary.main,
            },
          }}
        >
          <FontAwesomeIcon icon="bars" />
        </IconButton>
      )}
      <NavBar tabs={tabs} />
    </Box>
  );
};

export default Header;
