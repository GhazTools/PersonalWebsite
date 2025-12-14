/**
 * LeftBar component - Modern dock-style sidebar
 */
import React from "react";
import { Box, Divider, IconButton, Tooltip, useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
  const isDark = theme.palette.mode === "dark";

  // Internal links.
  const internals = pages.map(({ name, url, icon, isInternal, badge }) => ({
    name,
    url,
    icon,
    isInternal,
    badge,
  }));

  const renderData = (data: ContactItem[]) => {
    return data.map((contactItem, index) => (
      <motion.div
        key={contactItem.name}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        <IconLink {...contactItem} />
      </motion.div>
    ));
  };

  return (
    <Box
      component={motion.aside}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      sx={{
        width: 56,
        height: "100vh",
        background: isDark
          ? "linear-gradient(180deg, rgba(40, 44, 52, 0.98) 0%, rgba(33, 37, 43, 0.95) 100%)"
          : "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 249, 250, 0.95) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRight: isDark
          ? "1px solid rgba(255, 255, 255, 0.06)"
          : "1px solid rgba(0, 0, 0, 0.08)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        py: 2,
        boxShadow: isDark
          ? "2px 0 8px rgba(0, 0, 0, 0.3)"
          : "2px 0 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Top section - Navigation */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        {/* Logo/Brand - Links to Home */}
        <Tooltip title="Home" placement="right" arrow>
          <Box
            component={Link}
            to="/"
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #42a5f5 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
              boxShadow: "0 4px 12px rgba(102, 162, 251, 0.3)",
              cursor: "pointer",
              textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "scale(1.1) rotate(5deg)",
                boxShadow: "0 6px 16px rgba(102, 162, 251, 0.4)",
              },
            }}
          >
            <FontAwesomeIcon
              icon="code"
              style={{ color: "#fff", fontSize: 16 }}
            />
          </Box>
        </Tooltip>

        {renderData(internals)}

        <Divider
          sx={{
            width: "70%",
            my: 1.5,
            borderColor: isDark
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(0, 0, 0, 0.08)",
          }}
        />

        {renderData(contactData)}
      </Box>

      {/* Bottom section - Theme toggle */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Tooltip
          title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
          placement="right"
          arrow
        >
          <IconButton
            component={motion.button}
            whileHover={{ scale: 1.15, rotate: mode === "dark" ? 15 : -15 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            size="small"
            sx={{
              width: 36,
              height: 36,
              color: mode === "dark" ? "#fbbf24" : "#6366f1",
              backgroundColor: isDark
                ? "rgba(251, 191, 36, 0.1)"
                : "rgba(99, 102, 241, 0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: isDark
                  ? "rgba(251, 191, 36, 0.2)"
                  : "rgba(99, 102, 241, 0.2)",
              },
            }}
          >
            <FontAwesomeIcon
              icon={mode === "dark" ? "sun" : "moon"}
              style={{ fontSize: 16 }}
            />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default LeftBar;
