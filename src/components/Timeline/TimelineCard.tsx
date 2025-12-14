/* eslint-disable react/prop-types */
/**
 * TimelineCard - Individual event card in the timeline
 * Displays date range, duration, title, and description with scroll-triggered animations
 * Styled to match the VS Code / macOS-inspired website theme
 */

import { motion } from "framer-motion";
import { Box, Typography, Chip, useTheme } from "@mui/material";
import type { TimelineEvent } from "./types";

interface TimelineCardProps {
  event: TimelineEvent;
  index: number;
  typeColors: Record<string, string>;
}

/**
 * Calculate duration string from start and end dates
 */
const calculateDuration = (
  startDate: string,
  endDate: string | null,
): string => {
  const start = new Date(startDate + "-01"); // Add day for proper parsing
  const end = endDate ? new Date(endDate + "-01") : new Date();

  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months += end.getMonth() - start.getMonth();

  if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""}`;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? "s" : ""}`;
  }

  return `${years} year${years !== 1 ? "s" : ""}, ${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
};

/**
 * Format date for display (e.g., "Aug 2023")
 */
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr + "-01");
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const TimelineCard: React.FC<TimelineCardProps> = ({
  event,
  index,
  typeColors,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isLeft = index % 2 === 0;

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: isLeft ? -100 : 100, // Slide in from left or right
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 20,
        mass: 0.8,
      },
    },
  };

  const typeColor = typeColors[event.type] || theme.palette.primary.main;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      style={{
        width: "100%",
        maxWidth: 420,
      }}
    >
      <Box
        sx={{
          p: 2.5,
          // VS Code inspired background
          background: isDark
            ? "rgba(33, 37, 43, 0.95)" // bgDarkBlue with transparency
            : "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          borderRadius: 2,
          // VS Code style border
          border: isDark
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(0, 0, 0, 0.1)",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.2s ease",
          // Subtle shadow
          boxShadow: isDark
            ? "0 4px 20px rgba(0, 0, 0, 0.3)"
            : "0 2px 12px rgba(0, 0, 0, 0.08)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: isDark
              ? "0 8px 30px rgba(0, 0, 0, 0.4)"
              : "0 6px 24px rgba(0, 0, 0, 0.12)",
            borderColor: isDark
              ? "rgba(255, 255, 255, 0.15)"
              : "rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        {/* Left accent bar - VS Code style */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: 3,
            background: typeColor,
            borderRadius: "3px 0 0 3px",
          }}
        />

        {/* Current indicator glow */}
        {event.isCurrent && (
          <Box
            sx={{
              position: "absolute",
              inset: -1,
              borderRadius: 2,
              border: `2px solid ${theme.palette.primary.main}`,
              pointerEvents: "none",
              boxShadow: `0 0 15px ${theme.palette.primary.main}40`,
            }}
          />
        )}

        {/* Content with left padding for accent bar */}
        <Box sx={{ pl: 1.5 }}>
          {/* Date range */}
          <Typography
            variant="caption"
            sx={{
              color: isDark ? "#9599a0" : "#86868b", // lbIconColor / secondary text
              fontFamily: "monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.02em",
            }}
          >
            {formatDate(event.startDate)} →{" "}
            {event.endDate ? formatDate(event.endDate) : "Present"}
          </Typography>

          {/* Duration badge */}
          <Typography
            component="span"
            sx={{
              display: "inline-block",
              ml: 1.5,
              px: 1,
              py: 0.25,
              borderRadius: 1,
              fontSize: "0.65rem",
              fontWeight: 600,
              fontFamily: "monospace",
              background: isDark
                ? "rgba(225, 219, 110, 0.15)" // yellow tint
                : "rgba(225, 219, 110, 0.25)",
              color: isDark ? "#e1db6e" : "#9a9540",
            }}
          >
            {calculateDuration(event.startDate, event.endDate)}
          </Typography>

          {/* Title */}
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: isDark ? "#f3f3f3" : "#1d1d1f",
              mt: 1,
              mb: 0.25,
              fontSize: "0.95rem",
              lineHeight: 1.3,
            }}
          >
            {event.title}
          </Typography>

          {/* Role */}
          <Typography
            variant="body2"
            sx={{
              color: isDark ? "#abb2bf" : "#515154", // textLightBlue
              mb: 1,
              fontSize: "0.8rem",
              fontWeight: 500,
            }}
          >
            {event.role}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              color: isDark ? "#909295" : "#86868b", // textDark
              lineHeight: 1.5,
              fontSize: "0.75rem",
              mb: 1.5,
            }}
          >
            {event.description}
          </Typography>

          {/* Tags row */}
          <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
            {/* Type chip */}
            <Chip
              label={event.type}
              size="small"
              sx={{
                height: 22,
                fontSize: "0.65rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                backgroundColor: `${typeColor}20`,
                color: typeColor,
                border: `1px solid ${typeColor}40`,
                "& .MuiChip-label": {
                  px: 1,
                },
              }}
            />
            {/* Present indicator */}
            {event.isCurrent && (
              <Chip
                label="PRESENT"
                size="small"
                sx={{
                  height: 22,
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  backgroundColor: isDark
                    ? "rgba(152, 195, 121, 0.15)" // green tint
                    : "rgba(76, 175, 80, 0.12)",
                  color: isDark ? "#98c379" : "#2e7d32",
                  border: isDark
                    ? "1px solid rgba(152, 195, 121, 0.3)"
                    : "1px solid rgba(76, 175, 80, 0.3)",
                  "& .MuiChip-label": {
                    px: 1,
                  },
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default TimelineCard;
