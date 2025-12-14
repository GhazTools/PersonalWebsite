/* eslint-disable react/prop-types */
/**
 * Experience View - Modern JSON-driven professional experience display
 * Shows all experience types prominently
 */

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  Chip,
  Grid,
  Button,
  Theme,
  CircularProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import ScienceIcon from "@mui/icons-material/Science";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DownloadIcon from "@mui/icons-material/Download";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import portfolioData from "../../data/json/portfolio.json";
import SEO from "../../components/SEO";
import { TechBadge } from "../../components/TechBadge";

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  highlights: string[];
  technologies: string[];
  companyUrl?: string;
}

type ExperienceType = "fulltime" | "internship" | "research";

const inferType = (exp: ExperienceItem): ExperienceType => {
  const role = exp.role.toLowerCase();
  const company = exp.company.toLowerCase();
  if (role.includes("intern")) return "internship";
  if (role.includes("research") || company.includes("lab")) return "research";
  return "fulltime";
};

const getCompanyColor = (type: ExperienceType): string => {
  switch (type) {
    case "fulltime":
      return "#98c379"; // Green
    case "internship":
      return "#e5c07b"; // Yellow
    case "research":
      return "#c678dd"; // Purple
    default:
      return "#61afef"; // Blue
  }
};

const ExperienceCard: React.FC<{
  exp: ExperienceItem;
  index: number;
  isDark: boolean;
  theme: Theme;
}> = ({ exp, index, isDark, theme }) => {
  const [expanded, setExpanded] = useState(false);
  const type = inferType(exp);
  const accentColor = getCompanyColor(type);
  const MAX_HIGHLIGHTS = 2;
  const hasMoreHighlights =
    exp.highlights && exp.highlights.length > MAX_HIGHLIGHTS;

  const formatDate = (date: string) => {
    const d = new Date(date + "-01");
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const getIcon = () => {
    switch (type) {
      case "research":
        return <ScienceIcon sx={{ fontSize: 24, color: accentColor }} />;
      case "internship":
        return <BusinessIcon sx={{ fontSize: 24, color: accentColor }} />;
      default:
        return <WorkIcon sx={{ fontSize: 24, color: accentColor }} />;
    }
  };

  const displayedHighlights = expanded
    ? exp.highlights
    : exp.highlights?.slice(0, MAX_HIGHLIGHTS);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      style={{ height: "100%" }}
    >
      <Box
        sx={{
          p: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: isDark
            ? "rgba(33, 37, 43, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
          borderRadius: 2,
          border: isDark
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(0, 0, 0, 0.08)",
          borderLeft: `4px solid ${accentColor}`,
          position: "relative",
        }}
      >
        {/* Company Header */}
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: 1.5,
              backgroundColor: accentColor + "15",
            }}
          >
            {getIcon()}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 0.25,
              }}
            >
              {exp.company}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <LocationOnIcon
                  sx={{ fontSize: 14, color: theme.palette.text.secondary }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {exp.location}
                </Typography>
              </Box>
              <Chip
                label={
                  type === "fulltime"
                    ? "Full Time"
                    : type === "research"
                      ? "Research"
                      : "Internship"
                }
                size="small"
                sx={{
                  backgroundColor: accentColor + "20",
                  color: accentColor,
                  fontWeight: 500,
                  fontSize: "0.7rem",
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Role */}
        <Box sx={{ ml: 5, pl: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1,
              flexWrap: "wrap",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: accentColor,
              }}
            >
              {exp.role}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CalendarMonthIcon
                sx={{ fontSize: 12, color: theme.palette.text.secondary }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  fontFamily: "monospace",
                }}
              >
                {formatDate(exp.startDate)} -{" "}
                {exp.endDate ? formatDate(exp.endDate) : "Present"}
              </Typography>
            </Box>
          </Box>

          {/* Highlights */}
          {exp.highlights && exp.highlights.length > 0 && (
            <Box sx={{ mt: 1, flex: 1 }}>
              {displayedHighlights?.map((highlight, hIndex) => (
                <Typography
                  key={hIndex}
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 0.75,
                    pl: 2,
                    position: "relative",
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                    "&::before": {
                      content: '"→"',
                      position: "absolute",
                      left: 0,
                      color: accentColor,
                    },
                  }}
                >
                  {highlight}
                </Typography>
              ))}
              {hasMoreHighlights && (
                <Button
                  size="small"
                  onClick={() => setExpanded(!expanded)}
                  endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  sx={{
                    mt: 0.5,
                    textTransform: "none",
                    color: accentColor,
                    fontSize: "0.75rem",
                    p: 0,
                    minWidth: "auto",
                    "&:hover": {
                      backgroundColor: "transparent",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {expanded
                    ? "Show less"
                    : `Show ${exp.highlights.length - MAX_HIGHLIGHTS} more`}
                </Button>
              )}
            </Box>
          )}

          {/* Technologies */}
          {exp.technologies && exp.technologies.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1.5 }}>
              {exp.technologies.map((tech) => (
                <TechBadge key={tech} tech={tech} isDark={isDark} />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

type FilterType = "all" | "fulltime" | "internship" | "research";

const ExperienceView: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { experience, profile, skills } = portfolioData;
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [isLoading, setIsLoading] = useState(false);

  // Handle filter change with loading state
  const handleFilterChange = (filter: FilterType) => {
    if (filter === activeFilter) return;
    setIsLoading(true);
    setActiveFilter(filter);
    setTimeout(() => setIsLoading(false), 400);
  };

  // Initial load effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Group experiences by type
  const fullTimeJobs = experience.filter(
    (exp) => inferType(exp as ExperienceItem) === "fulltime",
  );
  const internships = experience.filter(
    (exp) => inferType(exp as ExperienceItem) === "internship",
  );
  const research = experience.filter(
    (exp) => inferType(exp as ExperienceItem) === "research",
  );

  const getFilteredExperiences = () => {
    switch (activeFilter) {
      case "fulltime":
        return fullTimeJobs;
      case "internship":
        return internships;
      case "research":
        return research;
      default:
        return experience;
    }
  };

  const filteredExperiences = getFilteredExperiences();

  const filterTabs = [
    {
      id: "all",
      label: "All Experience",
      icon: AllInclusiveIcon,
      count: experience.length,
      color: theme.palette.primary.main,
    },
    {
      id: "fulltime",
      label: "Full-Time",
      icon: WorkIcon,
      count: fullTimeJobs.length,
      color: "#98c379",
    },
    {
      id: "research",
      label: "Research",
      icon: ScienceIcon,
      count: research.length,
      color: "#c678dd",
    },
    {
      id: "internship",
      label: "Internships",
      icon: BusinessIcon,
      count: internships.length,
      color: "#e5c07b",
    },
  ];

  // Get all framework names for display
  const frameworkNames = [
    ...skills.frameworks.backend.map((f) => f.name),
    ...skills.frameworks.frontend.map((f) => f.name),
    ...skills.frameworks.ml.map((f) => f.name),
  ].slice(0, 8);

  return (
    <>
      <SEO
        title="Experience"
        description="Professional experience including full-time roles, internships, and research positions at top tech companies."
        pathname="/resume"
      />
      <Box sx={{ py: 6, minHeight: "100vh" }}>
        <Container maxWidth="lg">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: theme.palette.text.primary,
                  mb: 1,
                  fontSize: { xs: "1.75rem", md: "2.5rem" },
                }}
              >
                Professional Experience
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.text.secondary, mb: 2 }}
              >
                {profile.title} • {profile.location}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DownloadIcon />}
                  href="/Shahbaz_Ghazanfar_Resume.pdf"
                  target="_blank"
                  download
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                  }}
                >
                  Download Resume
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DownloadIcon />}
                  href="/Shahbaz_Ghazanfar_CV.pdf"
                  target="_blank"
                  download
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    borderColor: "#c678dd",
                    color: "#c678dd",
                    "&:hover": {
                      borderColor: "#c678dd",
                      backgroundColor: "rgba(198, 120, 221, 0.1)",
                    },
                  }}
                >
                  Download CV
                </Button>
              </Box>
            </Box>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 1,
                mb: 4,
              }}
            >
              {filterTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeFilter === tab.id;
                return (
                  <Button
                    key={tab.id}
                    onClick={() => handleFilterChange(tab.id as FilterType)}
                    variant={isActive ? "contained" : "outlined"}
                    disabled={isLoading}
                    startIcon={<Icon sx={{ fontSize: 16 }} />}
                    sx={{
                      borderRadius: 2,
                      px: 2,
                      py: 0.75,
                      textTransform: "none",
                      fontWeight: 500,
                      fontSize: "0.85rem",
                      transition: "all 0.2s ease",
                      borderColor: isActive
                        ? tab.color
                        : isDark
                          ? "rgba(255, 255, 255, 0.15)"
                          : "rgba(0, 0, 0, 0.15)",
                      backgroundColor: isActive ? tab.color : "transparent",
                      color: isActive ? "#fff" : theme.palette.text.secondary,
                      "&:hover": {
                        backgroundColor: isActive
                          ? tab.color
                          : tab.color + "15",
                        borderColor: tab.color,
                      },
                    }}
                  >
                    {tab.label}
                    <Chip
                      label={tab.count}
                      size="small"
                      sx={{
                        ml: 1,
                        height: 20,
                        fontSize: "0.7rem",
                        backgroundColor: isActive
                          ? "rgba(255, 255, 255, 0.2)"
                          : tab.color + "20",
                        color: isActive ? "#fff" : tab.color,
                      }}
                    />
                  </Button>
                );
              })}
            </Box>
          </motion.div>

          {/* Filtered Experience List */}
          <Box sx={{ minHeight: 400, position: "relative" }}>
            {/* Loading Overlay */}
            {isLoading && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isDark
                    ? "rgba(30, 33, 39, 0.9)"
                    : "rgba(255, 255, 255, 0.9)",
                  zIndex: 10,
                  borderRadius: 2,
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <CircularProgress size={40} sx={{ mb: 2 }} />
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Loading experience...
                  </Typography>
                </Box>
              </Box>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <Grid container spacing={3}>
                  {filteredExperiences.map((exp, index) => (
                    <Grid key={exp.id} size={{ xs: 12, md: 6 }}>
                      <ExperienceCard
                        exp={exp as ExperienceItem}
                        index={index}
                        isDark={isDark}
                        theme={theme}
                      />
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </AnimatePresence>
          </Box>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Box
              sx={{
                mt: 6,
                p: 3,
                background: isDark
                  ? "rgba(33, 37, 43, 0.95)"
                  : "rgba(255, 255, 255, 0.95)",
                borderRadius: 2,
                border: isDark
                  ? "1px solid rgba(255, 255, 255, 0.08)"
                  : "1px solid rgba(0, 0, 0, 0.08)",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  mb: 1.5,
                }}
              >
                Primary Technologies
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {[...skills.languages.map((l) => l.name), ...frameworkNames]
                  .slice(0, 12)
                  .map((skillName) => (
                    <Chip
                      key={skillName}
                      label={skillName}
                      size="small"
                      sx={{
                        backgroundColor: theme.palette.primary.main + "15",
                        color: theme.palette.primary.main,
                        fontWeight: 500,
                        fontSize: "0.75rem",
                      }}
                    />
                  ))}
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default ExperienceView;
