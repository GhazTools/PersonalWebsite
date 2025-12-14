/* eslint-disable react/prop-types */
/**
 * Projects View - Modern JSON-driven project showcase
 * Replaces the markdown-based projects.md
 */

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  Chip,
  Grid,
  IconButton,
  Button,
  Theme,
  CircularProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CodeIcon from "@mui/icons-material/Code";
import StarIcon from "@mui/icons-material/Star";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import portfolioData from "../../data/json/portfolio.json";
import SEO from "../../components/SEO";
import { TechBadge } from "../../components/TechBadge";

type ProjectCategory = "all" | "featured" | "completed" | "minor";

interface Project {
  id: string;
  name: string;
  description: string;
  technologies?: string[];
  githubUrl?: string;
  url?: string;
  highlights?: string[];
  status?: string;
  year?: string;
}

const ProjectCard: React.FC<{
  project: Project;
  index: number;
  isDark: boolean;
  theme: Theme;
}> = ({ project, index, isDark, theme }) => {
  const [expanded, setExpanded] = useState(false);
  const MAX_HIGHLIGHTS = 2;
  const hasMoreHighlights =
    project.highlights && project.highlights.length > MAX_HIGHLIGHTS;
  const displayedHighlights = expanded
    ? project.highlights
    : project.highlights?.slice(0, MAX_HIGHLIGHTS);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      style={{ height: "100%" }}
    >
      <Box
        sx={{
          height: "100%",
          minHeight: 280,
          p: 3,
          background: isDark
            ? "rgba(33, 37, 43, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
          borderRadius: 2,
          border: isDark
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s ease",
          display: "flex",
          flexDirection: "column",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: `0 8px 24px ${isDark ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.1)"}`,
            borderColor: theme.palette.primary.main + "60",
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <FolderOpenIcon
            sx={{ color: theme.palette.primary.main, fontSize: 28 }}
          />
          <Box sx={{ display: "flex", gap: 0.5 }}>
            {project.githubUrl && (
              <IconButton
                component="a"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color: theme.palette.text.secondary,
                  "&:hover": { color: theme.palette.primary.main },
                }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            )}
            {project.url && (
              <IconButton
                component="a"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color: theme.palette.text.secondary,
                  "&:hover": { color: theme.palette.primary.main },
                }}
              >
                <LaunchIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: 1,
            fontSize: "1rem",
          }}
        >
          {project.name}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            mb: 2,
            flex: 1,
            lineHeight: 1.6,
          }}
        >
          {project.description}
        </Typography>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <Box sx={{ mb: 2, flex: 1 }}>
            {displayedHighlights?.map((highlight, idx) => (
              <Typography
                key={idx}
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: "0.75rem",
                  mb: 0.5,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 0.5,
                }}
              >
                <span style={{ color: theme.palette.primary.main }}>→</span>
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
                  color: theme.palette.primary.main,
                  fontSize: "0.7rem",
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
                  : `Show ${project.highlights.length - MAX_HIGHLIGHTS} more`}
              </Button>
            )}
          </Box>
        )}

        {/* Tech Stack Badges */}
        {project.technologies && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: "auto" }}>
            {project.technologies.slice(0, 5).map((tech) => (
              <TechBadge key={tech} tech={tech} isDark={isDark} />
            ))}
            {project.technologies.length > 5 && (
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  px: 1,
                  py: 0.25,
                  borderRadius: 1,
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.04)",
                  color: theme.palette.text.secondary,
                  fontSize: "0.7rem",
                  fontFamily: "monospace",
                }}
              >
                +{project.technologies.length - 5}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </motion.div>
  );
};

const ProjectsView: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { projects } = portfolioData;

  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [isLoading, setIsLoading] = useState(false);

  const allProjects = [
    ...projects.featured,
    ...projects.completed,
    ...projects.minor,
  ];

  const categories = [
    {
      id: "all",
      label: "All Projects",
      icon: CodeIcon,
      count: allProjects.length,
    },
    {
      id: "featured",
      label: "Featured",
      icon: StarIcon,
      count: projects.featured.length,
    },
    {
      id: "completed",
      label: "Completed",
      icon: CheckCircleIcon,
      count: projects.completed.length,
    },
    {
      id: "minor",
      label: "Minor/Scripts",
      icon: FolderOpenIcon,
      count: projects.minor.length,
    },
  ];

  const getFilteredProjects = (): Project[] => {
    switch (activeCategory) {
      case "featured":
        return projects.featured as Project[];
      case "completed":
        return projects.completed as Project[];
      case "minor":
        return projects.minor as Project[];
      default:
        return allProjects as Project[];
    }
  };

  const filteredProjects = getFilteredProjects();

  // Handle category change with brief loading state
  const handleCategoryChange = (category: ProjectCategory) => {
    if (category === activeCategory) return;
    setIsLoading(true);
    setActiveCategory(category);
    // Brief delay to show loading feedback
    setTimeout(() => setIsLoading(false), 400);
  };

  // Initial load effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SEO
        title="Projects"
        description="Featured software projects, open source contributions, and personal coding experiments."
        pathname="/projects"
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
                Projects
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.text.secondary }}
              >
                A collection of things I&apos;ve built
              </Typography>
            </Box>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
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
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <Button
                    key={cat.id}
                    onClick={() =>
                      handleCategoryChange(cat.id as ProjectCategory)
                    }
                    variant={isActive ? "contained" : "outlined"}
                    disabled={isLoading}
                    startIcon={<Icon sx={{ fontSize: 18 }} />}
                    sx={{
                      borderRadius: 2,
                      px: 2,
                      py: 0.75,
                      textTransform: "none",
                      fontWeight: 500,
                      borderColor: isActive
                        ? theme.palette.primary.main
                        : isDark
                          ? "rgba(255, 255, 255, 0.15)"
                          : "rgba(0, 0, 0, 0.15)",
                      backgroundColor: isActive
                        ? theme.palette.primary.main
                        : "transparent",
                      color: isActive ? "#fff" : theme.palette.text.secondary,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: isActive
                          ? theme.palette.primary.dark
                          : theme.palette.primary.main + "15",
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                  >
                    {cat.label}
                    <Chip
                      label={cat.count}
                      size="small"
                      sx={{
                        ml: 1,
                        height: 20,
                        fontSize: "0.7rem",
                        backgroundColor: isActive
                          ? "rgba(255, 255, 255, 0.2)"
                          : theme.palette.primary.main + "20",
                        color: isActive ? "#fff" : theme.palette.primary.main,
                      }}
                    />
                  </Button>
                );
              })}
            </Box>
          </motion.div>

          {/* Projects Grid */}
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
                    Loading projects...
                  </Typography>
                </Box>
              </Box>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <Grid container spacing={3}>
                  {filteredProjects.map((project, index) => (
                    <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
                      <ProjectCard
                        project={project}
                        index={index}
                        isDark={isDark}
                        theme={theme}
                      />
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {filteredProjects.length === 0 && !isLoading && (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  No projects in this category
                </Typography>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProjectsView;
