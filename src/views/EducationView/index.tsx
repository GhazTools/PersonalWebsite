/* eslint-disable react/prop-types */
/**
 * Education View - Modern JSON-driven education display
 * Replaces the markdown-based education.md
 */

import React from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  Chip,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

import portfolioData from "../../data/json/portfolio.json";
import SEO from "../../components/SEO";

const EducationView: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { education, programs } = portfolioData;

  const formatDate = (date: string) => {
    const d = new Date(date + "-01");
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <>
      <SEO
        title="Education"
        description="Academic background, degrees, coursework, and educational achievements."
        pathname="/education"
      />
      <Box sx={{ py: 6, minHeight: "100vh" }}>
        <Container maxWidth="lg">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: theme.palette.text.primary,
                  mb: 1,
                  fontSize: { xs: "1.75rem", md: "2.5rem" },
                }}
              >
                Education
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.text.secondary }}
              >
                My academic background and achievements
              </Typography>
            </Box>
          </motion.div>

          {/* Main Education Card */}
          {education.map((edu) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Box
                sx={{
                  p: { xs: 3, md: 4 },
                  mb: 4,
                  background: isDark
                    ? "rgba(33, 37, 43, 0.95)"
                    : "rgba(255, 255, 255, 0.95)",
                  borderRadius: 3,
                  border: isDark
                    ? "1px solid rgba(255, 255, 255, 0.08)"
                    : "1px solid rgba(0, 0, 0, 0.08)",
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

                {/* Header */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: theme.palette.primary.main + "20",
                      color: theme.palette.primary.main,
                    }}
                  >
                    <SchoolIcon sx={{ fontSize: 32 }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                        mb: 0.5,
                      }}
                    >
                      {edu.institution}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 500,
                        mb: 0.5,
                      }}
                    >
                      {edu.degree} in {edu.field}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontFamily: "monospace",
                        }}
                      >
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate!)}
                      </Typography>
                      <Chip
                        label={edu.gpa}
                        size="small"
                        sx={{
                          backgroundColor: "#98c37920",
                          color: "#98c379",
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                <Grid container spacing={3}>
                  {/* Honors & Awards */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <EmojiEventsIcon
                        sx={{ color: "#e1db6e", fontSize: 20 }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.text.primary,
                        }}
                      >
                        Honors & Awards
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {edu.highlights.map((honor) => (
                        <Chip
                          key={honor}
                          label={honor}
                          size="small"
                          sx={{
                            backgroundColor: "#e1db6e20",
                            color: "#e1db6e",
                            border: "1px solid #e1db6e30",
                          }}
                        />
                      ))}
                    </Box>
                  </Grid>

                  {/* Relevant Coursework */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <MenuBookIcon
                        sx={{ color: theme.palette.primary.main, fontSize: 20 }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.text.primary,
                        }}
                      >
                        Relevant Coursework
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {edu.coursework?.map((course) => (
                        <Chip
                          key={course}
                          label={course}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: theme.palette.primary.main + "40",
                            color: theme.palette.text.secondary,
                            fontSize: "0.75rem",
                          }}
                        />
                      ))}
                    </Box>
                  </Grid>

                  {/* Activities */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <GroupsIcon sx={{ color: "#56b6c2", fontSize: 20 }} />
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.text.primary,
                        }}
                      >
                        Clubs & Organizations
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {edu.activities?.map((activity) => (
                        <Chip
                          key={activity}
                          label={activity}
                          size="small"
                          sx={{
                            backgroundColor: "#56b6c220",
                            color: "#56b6c2",
                            border: "1px solid #56b6c230",
                          }}
                        />
                      ))}
                    </Box>
                  </Grid>

                  {/* Teaching Experience */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <WorkspacePremiumIcon
                        sx={{ color: "#c678dd", fontSize: 20 }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.text.primary,
                        }}
                      >
                        Teaching Experience
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                      }}
                    >
                      {edu.teaching?.map((item) => (
                        <Typography
                          key={item}
                          variant="body2"
                          sx={{
                            color: theme.palette.text.secondary,
                            fontSize: "0.85rem",
                          }}
                        >
                          • {item}
                        </Typography>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </motion.div>
          ))}

          {/* Programs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Box
              sx={{
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
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  mb: 2,
                }}
              >
                Programs & Certifications
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                {programs.map((program) => (
                  <Chip
                    key={program.id}
                    label={`${program.name} (${program.year})`}
                    sx={{
                      backgroundColor: theme.palette.primary.main + "15",
                      color: theme.palette.primary.main,
                      fontWeight: 500,
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

export default EducationView;
