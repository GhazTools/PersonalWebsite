/* eslint-disable react/prop-types */
/**
 * Interactive Resume - Expandable sections with VS Code inspired design
 * Features tabbed navigation, skill bars, and downloadable PDF option
 */

import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  Tabs,
  Tab,
  Chip,
  LinearProgress,
  IconButton,
  Tooltip,
  Collapse,
  Link,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import CodeIcon from "@mui/icons-material/Code";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DownloadIcon from "@mui/icons-material/Download";

import type {
  ResumeConfig,
  ExperienceItem,
  EducationItem,
  SkillCategory,
  Project,
} from "./types";

interface InteractiveResumeProps {
  config: ResumeConfig;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

/**
 * Experience Card Component
 */
const ExperienceCard: React.FC<{ item: ExperienceItem; index: number }> = ({
  item,
  index,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [expanded, setExpanded] = useState(index === 0);

  const formatDate = (date: string) => {
    const d = new Date(date + "-01");
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Box
        sx={{
          mb: 2,
          p: 2.5,
          background: isDark
            ? "rgba(40, 44, 52, 0.6)"
            : "rgba(255, 255, 255, 0.8)",
          borderRadius: 2,
          border: isDark
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(0, 0, 0, 0.08)",
          transition: "all 0.2s ease",
          "&:hover": {
            borderColor: theme.palette.primary.main + "40",
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            cursor: "pointer",
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  fontSize: "1rem",
                }}
              >
                {item.role}
              </Typography>
              {!item.endDate && (
                <Chip
                  label="Current"
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    backgroundColor: theme.palette.primary.main + "20",
                    color: theme.palette.primary.main,
                  }}
                />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <Typography
                component={item.companyUrl ? Link : "span"}
                href={item.companyUrl}
                target="_blank"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  "&:hover": item.companyUrl
                    ? { textDecoration: "underline" }
                    : {},
                }}
              >
                {item.company}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: theme.palette.text.secondary }}
              >
                • {item.location}
              </Typography>
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.secondary,
                fontFamily: "monospace",
              }}
            >
              {formatDate(item.startDate)} -{" "}
              {item.endDate ? formatDate(item.endDate) : "Present"}
            </Typography>
          </Box>
          <IconButton size="small">
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>

        {/* Expandable Content */}
        <Collapse in={expanded}>
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary, mb: 2 }}
            >
              {item.description}
            </Typography>

            {/* Highlights */}
            <Box component="ul" sx={{ pl: 2, mb: 2, mt: 0 }}>
              {item.highlights.map((highlight, i) => (
                <Typography
                  component="li"
                  key={i}
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 0.5,
                    fontSize: "0.85rem",
                  }}
                >
                  {highlight}
                </Typography>
              ))}
            </Box>

            {/* Technologies */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
              {item.technologies.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  size="small"
                  sx={{
                    height: 24,
                    fontSize: "0.7rem",
                    fontFamily: "monospace",
                    backgroundColor: isDark
                      ? "rgba(102, 162, 251, 0.15)"
                      : "rgba(102, 162, 251, 0.1)",
                    color: theme.palette.primary.main,
                    border: `1px solid ${theme.palette.primary.main}30`,
                  }}
                />
              ))}
            </Box>
          </Box>
        </Collapse>
      </Box>
    </motion.div>
  );
};

/**
 * Education Card Component
 */
const EducationCard: React.FC<{ item: EducationItem; index: number }> = ({
  item,
  index,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const formatDate = (date: string) => {
    const d = new Date(date + "-01");
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Box
        sx={{
          mb: 2,
          p: 2.5,
          background: isDark
            ? "rgba(40, 44, 52, 0.6)"
            : "rgba(255, 255, 255, 0.8)",
          borderRadius: 2,
          border: isDark
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(0, 0, 0, 0.08)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              fontSize: "1rem",
            }}
          >
            {item.degree} in {item.field}
          </Typography>
          {item.gpa && (
            <Chip
              label={`GPA: ${item.gpa}`}
              size="small"
              sx={{
                height: 20,
                fontSize: "0.65rem",
                fontWeight: 600,
                backgroundColor: "#98c37920",
                color: "#98c379",
              }}
            />
          )}
        </Box>
        <Typography
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 500,
            fontSize: "0.9rem",
          }}
        >
          {item.institution}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            fontFamily: "monospace",
          }}
        >
          {formatDate(item.startDate)} -{" "}
          {item.endDate ? formatDate(item.endDate) : "Present"}
          {" • "}
          {item.location}
        </Typography>

        {item.highlights.length > 0 && (
          <Box component="ul" sx={{ pl: 2, mb: 0, mt: 1.5 }}>
            {item.highlights.map((highlight, i) => (
              <Typography
                component="li"
                key={i}
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 0.5,
                  fontSize: "0.85rem",
                }}
              >
                {highlight}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    </motion.div>
  );
};

/**
 * Skills Section Component
 */
const SkillsSection: React.FC<{ categories: SkillCategory[] }> = ({
  categories,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const getLevelColor = (level: number) => {
    if (level >= 5) return "#98c379";
    if (level >= 4) return "#66a2fb";
    if (level >= 3) return "#e1db6e";
    return "#d19a66";
  };

  return (
    <Box>
      {categories.map((category, catIndex) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: catIndex * 0.1 }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                mb: 2,
                fontSize: "0.95rem",
                borderBottom: isDark
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid rgba(0, 0, 0, 0.1)",
                pb: 1,
              }}
            >
              {category.category}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {category.skills.map((skill) => (
                <Box key={skill.name}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 0.5,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.primary,
                        fontWeight: 500,
                        fontSize: "0.85rem",
                      }}
                    >
                      {skill.name}
                    </Typography>
                    {skill.yearsOfExperience && (
                      <Typography
                        variant="caption"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontFamily: "monospace",
                        }}
                      >
                        {skill.yearsOfExperience}+ yrs
                      </Typography>
                    )}
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(skill.level / 5) * 100}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: isDark
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(0, 0, 0, 0.08)",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 3,
                        backgroundColor: getLevelColor(skill.level),
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>
      ))}
    </Box>
  );
};

/**
 * Projects Section Component
 */
const ProjectsSection: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 2,
      }}
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Box
            sx={{
              p: 2.5,
              height: "100%",
              background: isDark
                ? "rgba(40, 44, 52, 0.6)"
                : "rgba(255, 255, 255, 0.8)",
              borderRadius: 2,
              border: isDark
                ? "1px solid rgba(255, 255, 255, 0.08)"
                : "1px solid rgba(0, 0, 0, 0.08)",
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                borderColor: theme.palette.primary.main + "40",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    fontSize: "0.95rem",
                  }}
                >
                  {project.name}
                </Typography>
                {project.featured && (
                  <Chip
                    label="Featured"
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: "0.6rem",
                      fontWeight: 600,
                      backgroundColor: "#e1db6e20",
                      color: "#e1db6e",
                    }}
                  />
                )}
              </Box>
              <Box sx={{ display: "flex", gap: 0.5 }}>
                {project.githubUrl && (
                  <Tooltip title="View on GitHub">
                    <IconButton
                      size="small"
                      component="a"
                      href={project.githubUrl}
                      target="_blank"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      <GitHubIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
                {project.url && (
                  <Tooltip title="View Project">
                    <IconButton
                      size="small"
                      component="a"
                      href={project.url}
                      target="_blank"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      <LaunchIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                mb: 2,
                fontSize: "0.85rem",
              }}
            >
              {project.description}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
              {project.technologies.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: "0.65rem",
                    fontFamily: "monospace",
                    backgroundColor: isDark
                      ? "rgba(102, 162, 251, 0.15)"
                      : "rgba(102, 162, 251, 0.1)",
                    color: theme.palette.primary.main,
                  }}
                />
              ))}
            </Box>
          </Box>
        </motion.div>
      ))}
    </Box>
  );
};

/**
 * Main Interactive Resume Component
 */
const InteractiveResume: React.FC<InteractiveResumeProps> = ({ config }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "Experience", icon: <WorkIcon /> },
    { label: "Education", icon: <SchoolIcon /> },
    { label: "Skills", icon: <CodeIcon /> },
    { label: "Projects", icon: <FolderSpecialIcon /> },
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              p: { xs: 3, md: 4 },
              mb: 4,
              background: isDark
                ? "linear-gradient(135deg, rgba(40, 44, 52, 0.9) 0%, rgba(33, 37, 43, 0.9) 100%)"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 248, 248, 0.95) 100%)",
              backdropFilter: "blur(12px)",
              borderRadius: 3,
              border: isDark
                ? "1px solid rgba(255, 255, 255, 0.08)"
                : "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: isDark
                ? "0 8px 32px rgba(0, 0, 0, 0.3)"
                : "0 4px 24px rgba(0, 0, 0, 0.08)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Accent line */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, #42a5f5, #98c379)`,
              }}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: theme.palette.text.primary,
                    fontSize: { xs: "1.75rem", md: "2.25rem" },
                    mb: 0.5,
                  }}
                >
                  {config.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                    mb: 1,
                  }}
                >
                  {config.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary, mb: 2 }}
                >
                  {config.tagline}
                </Typography>

                {/* Contact info row */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <LocationOnIcon
                      sx={{ fontSize: 16, color: theme.palette.text.secondary }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {config.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <EmailIcon
                      sx={{ fontSize: 16, color: theme.palette.text.secondary }}
                    />
                    <Typography
                      component="a"
                      href={`mailto:${config.email}`}
                      variant="caption"
                      sx={{
                        color: theme.palette.primary.main,
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {config.email}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Social links & download */}
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                {config.github && (
                  <Tooltip title="GitHub">
                    <IconButton
                      component="a"
                      href={config.github}
                      target="_blank"
                      sx={{
                        color: theme.palette.text.secondary,
                        "&:hover": { color: theme.palette.primary.main },
                      }}
                    >
                      <GitHubIcon />
                    </IconButton>
                  </Tooltip>
                )}
                {config.linkedin && (
                  <Tooltip title="LinkedIn">
                    <IconButton
                      component="a"
                      href={config.linkedin}
                      target="_blank"
                      sx={{
                        color: theme.palette.text.secondary,
                        "&:hover": { color: "#0077b5" },
                      }}
                    >
                      <LinkedInIcon />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title="Download Resume PDF">
                  <IconButton
                    sx={{
                      ml: 1,
                      backgroundColor: theme.palette.primary.main + "20",
                      color: theme.palette.primary.main,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.main + "30",
                      },
                    }}
                  >
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box
            sx={{
              mb: 3,
              background: isDark
                ? "rgba(33, 37, 43, 0.8)"
                : "rgba(255, 255, 255, 0.8)",
              borderRadius: 2,
              border: isDark
                ? "1px solid rgba(255, 255, 255, 0.08)"
                : "1px solid rgba(0, 0, 0, 0.08)",
            }}
          >
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              variant="fullWidth"
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  py: 2,
                  color: theme.palette.text.secondary,
                  "&.Mui-selected": {
                    color: theme.palette.primary.main,
                  },
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: theme.palette.primary.main,
                  height: 3,
                },
              }}
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  label={tab.label}
                  icon={tab.icon}
                  iconPosition="start"
                />
              ))}
            </Tabs>
          </Box>
        </motion.div>

        {/* Tab Panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabPanel value={activeTab} index={0}>
              {config.experience.map((item, index) => (
                <ExperienceCard key={item.id} item={item} index={index} />
              ))}
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
              {config.education.map((item, index) => (
                <EducationCard key={item.id} item={item} index={index} />
              ))}
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
              <SkillsSection categories={config.skills} />
            </TabPanel>

            <TabPanel value={activeTab} index={3}>
              <ProjectsSection projects={config.projects} />
            </TabPanel>
          </motion.div>
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default InteractiveResume;
