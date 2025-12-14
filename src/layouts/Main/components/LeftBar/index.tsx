/**
 * LeftBar component - Modernized with MUI
 */
import React from "react";
import { Box, Divider, IconButton, Tooltip, useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconLink from "../../../../components/IconLink";
import { ContactItem } from "../../../../models";
import { pages } from "./../../../../data";
import { useThemeMode } from "../../../../contexts/ThemeContext";

export interface LeftBarProps {
  contactData: ContactItem[];
}

const LeftBar: React.FC<LeftBarProps> = ({ contactData }) => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();

  // Internal links.
  const internals = pages.map(({ name, url, icon, isInternal, badge }) => ({
    name,
    url,
    icon,
    isInternal,
    badge,
  }));

  const renderData = (data: ContactItem[]) => {
    return data.map((contactItem) => (
      <IconLink key={contactItem.name} {...contactItem} />
    ));
  };

  return (
    <Box
      sx={{
        width: 48,
        height: "100vh",
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(33, 37, 43, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderRight:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255, 255, 255, 0.05)"
            : "1px solid rgba(0, 0, 0, 0.08)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        py: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        {renderData(internals)}
        <Divider
          sx={{
            width: "60%",
            my: 1,
            borderColor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)",
          }}
        />
        {renderData(contactData)}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Tooltip
          title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
          placement="right"
        >
          <IconButton
            onClick={toggleTheme}
            size="small"
            sx={{
              color: theme.palette.text.secondary,
              transition: "all 0.2s",
              "&:hover": {
                color: theme.palette.primary.main,
                backgroundColor: "transparent",
              },
            }}
          >
            <FontAwesomeIcon
              icon={mode === "dark" ? "sun" : "moon"}
              size="lg"
            />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default LeftBar;
