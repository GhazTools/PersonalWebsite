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
        backgroundColor: "rgba(33, 37, 43, 0.95)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        pl: "64px", // Account for left sidebar (48px + 16px padding)
        fontSize: "0.75rem",
        color: "#abb2bf",
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
          color: "#abb2bf",
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
