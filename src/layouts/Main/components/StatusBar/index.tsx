/**
 * StatusBar component - Modern terminal-style status bar
 */
import React, { useState, useEffect } from "react";
import { Box, Link, Typography, useTheme, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

// Last updated date - update this when making significant changes
const LAST_UPDATED = "December 2025";

interface StatusBarProps {
  onOpenCommandPalette?: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({ onOpenCommandPalette }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Box
      component={motion.footer}
      initial={{ y: 28 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      sx={{
        height: 26,
        background: isDark
          ? "linear-gradient(180deg, rgba(40, 44, 52, 0.98) 0%, rgba(33, 37, 43, 0.95) 100%)"
          : "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 249, 250, 0.95) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: isDark
          ? "1px solid rgba(255, 255, 255, 0.06)"
          : "1px solid rgba(0, 0, 0, 0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        pl: { xs: 2, md: "72px" }, // Account for left sidebar on desktop only
        fontSize: "0.7rem",
        color: theme.palette.text.secondary,
      }}
    >
      {/* Left section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Link
          href="https://github.com/GhazanfarShahbaz/PersonalWebsite"
          rel="noopener noreferrer"
          target="_blank"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: theme.palette.text.secondary,
            textDecoration: "none",
            transition: "all 0.2s",
            px: 1,
            py: 0.25,
            borderRadius: 0.5,
            "&:hover": {
              color: theme.palette.primary.main,
              backgroundColor: isDark
                ? "rgba(102, 162, 251, 0.1)"
                : "rgba(102, 162, 251, 0.08)",
            },
          }}
        >
          <FontAwesomeIcon icon="code-branch" style={{ fontSize: 10 }} />
          <Typography
            variant="caption"
            sx={{ fontSize: "0.7rem", fontWeight: 500 }}
          >
            main
          </Typography>
        </Link>

        <Tooltip title="Last site update" arrow>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 0.5,
              px: 1,
              py: 0.25,
              borderRadius: 0.5,
              color: "#61afef",
            }}
          >
            <FontAwesomeIcon icon="calendar-check" style={{ fontSize: 10 }} />
            <Typography
              variant="caption"
              sx={{ fontSize: "0.65rem", fontWeight: 500 }}
            >
              {LAST_UPDATED}
            </Typography>
          </Box>
        </Tooltip>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            px: 1,
            py: 0.25,
            borderRadius: 0.5,
            color: "#98c379",
          }}
        >
          <Box
            component={motion.div}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#98c379",
            }}
          />
          <Typography
            variant="caption"
            sx={{ fontSize: "0.65rem", fontWeight: 500 }}
          >
            All systems operational
          </Typography>
        </Box>
      </Box>

      {/* Right section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Tooltip
          title="Quick navigation - Press ⌘K to search and navigate"
          arrow
        >
          <Box
            onClick={onOpenCommandPalette}
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 0.5,
              px: 1,
              py: 0.25,
              borderRadius: 0.5,
              cursor: "pointer",
              transition: "all 0.2s",
              border: "1px solid",
              borderColor: isDark
                ? "rgba(102, 162, 251, 0.3)"
                : "rgba(102, 162, 251, 0.4)",
              backgroundColor: isDark
                ? "rgba(102, 162, 251, 0.1)"
                : "rgba(102, 162, 251, 0.08)",
              "&:hover": {
                backgroundColor: isDark
                  ? "rgba(102, 162, 251, 0.2)"
                  : "rgba(102, 162, 251, 0.15)",
                borderColor: isDark
                  ? "rgba(102, 162, 251, 0.5)"
                  : "rgba(102, 162, 251, 0.6)",
              },
            }}
          >
            <FontAwesomeIcon icon="keyboard" style={{ fontSize: 10 }} />
            <Typography
              variant="caption"
              sx={{ fontSize: "0.65rem", fontWeight: 500 }}
            >
              ⌘K
            </Typography>
          </Box>
        </Tooltip>

        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: 0.5,
            px: 1,
          }}
        >
          <FontAwesomeIcon
            icon={["fab", "react"]}
            style={{ fontSize: 10, color: "#61dafb" }}
          />
          <Typography variant="caption" sx={{ fontSize: "0.65rem" }}>
            React 18
          </Typography>
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 0.5,
            px: 1,
          }}
        >
          <FontAwesomeIcon
            icon="bolt"
            style={{ fontSize: 10, color: "#fbbf24" }}
          />
          <Typography variant="caption" sx={{ fontSize: "0.65rem" }}>
            Vite
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            px: 1,
          }}
        >
          <FontAwesomeIcon icon="clock" style={{ fontSize: 10 }} />
          <Typography
            variant="caption"
            sx={{ fontSize: "0.7rem", fontWeight: 500 }}
          >
            {formatTime(time)}
          </Typography>
        </Box>

        <Box
          component={motion.div}
          whileHover={{ scale: 1.1 }}
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon
            icon="heart"
            style={{ fontSize: 10, color: "#e06c75" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default StatusBar;
