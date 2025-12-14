/**
 * NavItem component - Modern pill-style tab
 */
import React from "react";
import { NavLink } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TabSpec, TabLink } from "../../../../../../models";
import { motion } from "framer-motion";

const NavItem: React.FC<TabSpec & TabLink> = ({
  name,
  url,
  mdFileName, // eslint-disable-line @typescript-eslint/no-unused-vars
  comp, // eslint-disable-line @typescript-eslint/no-unused-vars
  color,
  ...iconProps
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <NavLink to={url} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Box
          component={motion.div}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            px: 1.5,
            py: 0.5,
            borderRadius: 1.5,
            position: "relative",
            color: isActive
              ? isDark
                ? "#fff"
                : theme.palette.text.primary
              : theme.palette.text.secondary,
            backgroundColor: isActive
              ? isDark
                ? "rgba(102, 162, 251, 0.15)"
                : "rgba(255, 255, 255, 0.9)"
              : "transparent",
            boxShadow: isActive
              ? isDark
                ? "0 1px 3px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
                : "0 1px 3px rgba(0, 0, 0, 0.1)"
              : "none",
            transition: "all 0.2s ease",
            cursor: "pointer",
            fontSize: "0.8rem",
            fontWeight: isActive ? 600 : 500,
            whiteSpace: "nowrap",
            "&:hover": {
              color: isDark ? "#fff" : theme.palette.text.primary,
              backgroundColor: isActive
                ? isDark
                  ? "rgba(102, 162, 251, 0.2)"
                  : "rgba(255, 255, 255, 1)"
                : isDark
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(0, 0, 0, 0.03)",
            },
          }}
        >
          <FontAwesomeIcon
            {...iconProps}
            size="xs"
            style={{
              color: isActive ? color : "inherit",
              transition: "color 0.2s ease",
            }}
          />
          <Box
            component="span"
            sx={{
              display: { xs: "none", sm: "inline" },
            }}
          >
            {name}
          </Box>
        </Box>
      )}
    </NavLink>
  );
};

export default NavItem;
