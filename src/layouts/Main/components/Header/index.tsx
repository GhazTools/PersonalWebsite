/**
 * Header component - Modern macOS-style tab bar
 */
import React from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import NavBar from "./NavBar";
import { TabProps } from "../..";

export interface HeaderProps extends TabProps {
  onMobileMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ tabs, onMobileMenuToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      component={motion.header}
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      sx={{
        height: 44,
        background: isDark
          ? "linear-gradient(180deg, rgba(40, 44, 52, 0.98) 0%, rgba(33, 37, 43, 0.95) 100%)"
          : "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 249, 250, 0.95) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: isDark
          ? "1px solid rgba(255, 255, 255, 0.06)"
          : "1px solid rgba(0, 0, 0, 0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: theme.zIndex.appBar,
        px: 1.5,
        boxShadow: isDark
          ? "0 1px 3px rgba(0, 0, 0, 0.3)"
          : "0 1px 3px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Left section - Mobile menu button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          minWidth: isMobile ? "auto" : 80,
        }}
      >
        {isMobile && (
          <IconButton
            onClick={onMobileMenuToggle}
            size="small"
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": {
                color: theme.palette.primary.main,
                backgroundColor: "rgba(102, 162, 251, 0.1)",
              },
            }}
          >
            <FontAwesomeIcon icon="bars" size="sm" />
          </IconButton>
        )}
      </Box>

      {/* Center - Tabs */}
      <NavBar tabs={tabs} />

      {/* Right section - Window title */}
      {!isMobile && (
        <Box
          sx={{
            minWidth: 80,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: "0.7rem",
              fontWeight: 500,
              opacity: 0.7,
            }}
          >
            ~/portfolio
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Header;
