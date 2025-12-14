/* eslint-disable react/prop-types */
/**
 * Achievements Component - Display awards, honors, certifications, and accomplishments
 * Features animated cards with trophy/medal icons and timeline-like layout
 */

import React from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  Chip,
  Link,
} from "@mui/material";
import { motion } from "framer-motion";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ArticleIcon from "@mui/icons-material/Article";
import StarIcon from "@mui/icons-material/Star";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import LaunchIcon from "@mui/icons-material/Launch";

import type { AchievementsConfig, Achievement } from "./types";

interface AchievementsProps {
  config: AchievementsConfig;
}

const typeConfig: Record<
  Achievement["type"],
  { icon: React.ReactNode; color: string; label: string }
> = {
  award: {
    icon: <EmojiEventsIcon />,
    color: "#e1db6e",
    label: "Award",
  },
  certification: {
    icon: <CardMembershipIcon />,
    color: "#66a2fb",
    label: "Certification",
  },
  publication: {
    icon: <ArticleIcon />,
    color: "#98c379",
    label: "Publication",
  },
  honor: {
    icon: <StarIcon />,
    color: "#c678dd",
    label: "Honor",
  },
  scholarship: {
    icon: <SchoolIcon />,
    color: "#56b6c2",
    label: "Scholarship",
  },
};

/**
 * Achievement Card Component
 */
const AchievementCard: React.FC<{
  achievement: Achievement;
  index: number;
}> = ({ achievement, index }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const config = typeConfig[achievement.type];
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 20,
        delay: index * 0.1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: { xs: 2, md: 3 },
          mb: 4,
          flexDirection: { xs: "column", md: isEven ? "row" : "row-reverse" },
        }}
      >
        {/* Icon Circle */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 60,
            minHeight: 60,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${config.color}30 0%, ${config.color}15 100%)`,
            border: `2px solid ${config.color}50`,
            color: config.color,
            boxShadow: `0 4px 20px ${config.color}20`,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.1) rotate(5deg)",
              boxShadow: `0 8px 30px ${config.color}40`,
            },
          }}
        >
          {config.icon}
        </Box>

        {/* Content Card */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 2.5, md: 3 },
            background: isDark
              ? "rgba(33, 37, 43, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(12px)",
            borderRadius: 2,
            border: isDark
              ? "1px solid rgba(255, 255, 255, 0.08)"
              : "1px solid rgba(0, 0, 0, 0.08)",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.2s ease",
            boxShadow: isDark
              ? "0 4px 20px rgba(0, 0, 0, 0.3)"
              : "0 2px 12px rgba(0, 0, 0, 0.06)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: isDark
                ? "0 8px 30px rgba(0, 0, 0, 0.4)"
                : "0 6px 24px rgba(0, 0, 0, 0.1)",
              borderColor: config.color + "40",
            },
          }}
        >
          {/* Accent line */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: 3,
              background: config.color,
              borderRadius: "3px 0 0 3px",
            }}
          />

          <Box sx={{ pl: 1.5 }}>
            {/* Header row */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 1,
                mb: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    fontSize: { xs: "0.95rem", md: "1rem" },
                    lineHeight: 1.3,
                  }}
                >
                  {achievement.title}
                </Typography>
                <Chip
                  label={config.label}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    backgroundColor: config.color + "20",
                    color: config.color,
                    border: `1px solid ${config.color}30`,
                  }}
                />
              </Box>
              {achievement.url && (
                <Link
                  href={achievement.url}
                  target="_blank"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: theme.palette.primary.main,
                    fontSize: "0.75rem",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  View <LaunchIcon sx={{ fontSize: 12 }} />
                </Link>
              )}
            </Box>

            {/* Organization and date */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1.5,
                flexWrap: "wrap",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 500,
                  fontSize: "0.85rem",
                }}
              >
                {achievement.organization}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  fontFamily: "monospace",
                  backgroundColor: isDark
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.05)",
                  px: 1,
                  py: 0.25,
                  borderRadius: 0.5,
                }}
              >
                {achievement.date}
              </Typography>
            </Box>

            {/* Description */}
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "0.85rem",
                lineHeight: 1.6,
              }}
            >
              {achievement.description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

/**
 * Main Achievements Component
 */
const Achievements: React.FC<AchievementsProps> = ({ config }) => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.5,
                mb: 2,
              }}
            >
              <WorkspacePremiumIcon
                sx={{
                  fontSize: 40,
                  color: "#e1db6e",
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: theme.palette.text.primary,
                  fontSize: { xs: "1.75rem", md: "2.5rem" },
                }}
              >
                {config.title}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 500,
                mx: "auto",
              }}
            >
              {config.subtitle}
            </Typography>
          </Box>
        </motion.div>

        {/* Type Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 1,
              mb: 6,
            }}
          >
            {Object.entries(typeConfig).map(([type, { color, label }]) => (
              <Chip
                key={type}
                label={label}
                size="small"
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  backgroundColor: color + "15",
                  color: color,
                  border: `1px solid ${color}30`,
                }}
              />
            ))}
          </Box>
        </motion.div>

        {/* Achievements List */}
        <Box>
          {config.achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
        </Box>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              mt: 8,
              pt: 4,
              borderTop: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
              display: "flex",
              justifyContent: "center",
              gap: { xs: 3, md: 6 },
              flexWrap: "wrap",
            }}
          >
            {[
              {
                label: "Awards",
                count: config.achievements.filter((a) => a.type === "award")
                  .length,
                color: "#e1db6e",
              },
              {
                label: "Honors",
                count: config.achievements.filter((a) => a.type === "honor")
                  .length,
                color: "#c678dd",
              },
              {
                label: "Scholarships",
                count: config.achievements.filter(
                  (a) => a.type === "scholarship",
                ).length,
                color: "#56b6c2",
              },
            ].map((stat) => (
              <Box key={stat.label} sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: stat.color,
                    fontSize: { xs: "1.5rem", md: "2rem" },
                  }}
                >
                  {stat.count}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Achievements;
