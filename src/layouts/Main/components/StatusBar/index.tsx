/**
 * StatusBar component - Modernized with MUI
 */
import React from "react";
import { Box, Link, useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StatusBar: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        height: 28,
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(33, 37, 43, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderTop:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255, 255, 255, 0.05)"
            : "1px solid rgba(0, 0, 0, 0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        pl: { xs: 2, md: "64px" }, // Account for left sidebar on desktop only
        fontSize: "0.75rem",
        color: theme.palette.text.secondary,
      }}
    >
      <Link
        href="https://github.com/GhazanfarShahbaz/PersonalWebsite"
        rel="noopener noreferrer"
        target="_blank"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          color: theme.palette.text.secondary,
          textDecoration: "none",
          transition: "color 0.2s",
          "&:hover": {
            color: theme.palette.primary.main,
          },
        }}
      >
        <FontAwesomeIcon icon="code-branch" size="xs" />
        <span>main</span>
      </Link>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <FontAwesomeIcon icon="smile" size="sm" />
      </Box>
    </Box>
  );
};

export default StatusBar;
