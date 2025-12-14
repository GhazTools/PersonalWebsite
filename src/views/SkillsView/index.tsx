/* eslint-disable react/prop-types */
/**
 * Skills View - Modern JSON-driven skills display
 * Replaces the markdown-based skills.md
 */

import React from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  Chip,
  LinearProgress,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import CloudIcon from "@mui/icons-material/Cloud";
import PsychologyIcon from "@mui/icons-material/Psychology";
import InterestsIcon from "@mui/icons-material/Interests";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

import portfolioData from "../../data/json/portfolio.json";
import SEO from "../../components/SEO";

const SkillsView: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { skills, interests } = portfolioData;

  const getLevelColor = (level: number) => {
    if (level >= 5) return "#98c379";
    if (level >= 4) return "#66a2fb";
    if (level >= 3) return "#e1db6e";
    return "#d19a66";
  };

  const SectionCard: React.FC<{
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    delay?: number;
  }> = ({ title, icon, children, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Box
        sx={{
          p: 3,
          mb: 3,
          background: isDark
            ? "rgba(33, 37, 43, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
          borderRadius: 2,
          border: isDark
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(0, 0, 0, 0.08)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
          <Box sx={{ color: theme.palette.primary.main }}>{icon}</Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              fontSize: "1.1rem",
            }}
          >
            {title}
          </Typography>
        </Box>
        {children}
      </Box>
    </motion.div>
  );

  return (
    <>
      <SEO
        title="Skills"
        description="Technical skills including programming languages, frameworks, tools, and technologies."
        pathname="/skills"
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
                Skills & Technologies
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.text.secondary }}
              >
                Technologies I work with and areas I&apos;m passionate about
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={3}>
            {/* Programming Languages */}
            <Grid size={{ xs: 12, md: 6 }}>
              <SectionCard
                title="Programming Languages"
                icon={<CodeIcon />}
                delay={0.1}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {skills.languages.map((lang) => (
                    <Box key={lang.name}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 0.5,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Box
                            sx={{
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              backgroundColor: lang.color,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.text.primary,
                              fontWeight: 500,
                            }}
                          >
                            {lang.name}
                          </Typography>
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: theme.palette.text.secondary,
                            fontFamily: "monospace",
                          }}
                        >
                          {lang.years}+ yrs
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(lang.level / 5) * 100}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: isDark
                            ? "rgba(255, 255, 255, 0.08)"
                            : "rgba(0, 0, 0, 0.08)",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 3,
                            backgroundColor: getLevelColor(lang.level),
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </SectionCard>
            </Grid>

            {/* Backend Frameworks */}
            <Grid size={{ xs: 12, md: 6 }}>
              <SectionCard
                title="Backend Frameworks"
                icon={<StorageIcon />}
                delay={0.2}
              >
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {skills.frameworks.backend.map((fw) => (
                    <Chip
                      key={fw.name}
                      label={fw.name}
                      sx={{
                        backgroundColor: getLevelColor(fw.level) + "20",
                        color: getLevelColor(fw.level),
                        border: `1px solid ${getLevelColor(fw.level)}30`,
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
              </SectionCard>

              <SectionCard
                title="Frontend & Mobile"
                icon={<CodeIcon />}
                delay={0.25}
              >
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {skills.frameworks.frontend.map((fw) => (
                    <Chip
                      key={fw.name}
                      label={fw.name}
                      sx={{
                        backgroundColor: getLevelColor(fw.level) + "20",
                        color: getLevelColor(fw.level),
                        border: `1px solid ${getLevelColor(fw.level)}30`,
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
              </SectionCard>
            </Grid>

            {/* Cloud & DevOps */}
            <Grid size={{ xs: 12, md: 6 }}>
              <SectionCard
                title="Cloud & DevOps"
                icon={<CloudIcon />}
                delay={0.3}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {skills.cloud.map((item) => (
                    <Box key={item.name}>
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
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: theme.palette.text.secondary,
                            fontFamily: "monospace",
                          }}
                        >
                          {item.years}+ yrs
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(item.level / 5) * 100}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: isDark
                            ? "rgba(255, 255, 255, 0.08)"
                            : "rgba(0, 0, 0, 0.08)",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 3,
                            backgroundColor: getLevelColor(item.level),
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </SectionCard>
            </Grid>

            {/* ML Frameworks */}
            <Grid size={{ xs: 12, md: 6 }}>
              <SectionCard
                title="Machine Learning"
                icon={<PsychologyIcon />}
                delay={0.35}
              >
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {skills.frameworks.ml.map((fw) => (
                    <Chip
                      key={fw.name}
                      label={fw.name}
                      sx={{
                        backgroundColor: getLevelColor(fw.level) + "20",
                        color: getLevelColor(fw.level),
                        border: `1px solid ${getLevelColor(fw.level)}30`,
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
              </SectionCard>
            </Grid>

            {/* Research Interests */}
            <Grid size={{ xs: 12, md: 6 }}>
              <SectionCard
                title="Research Interests"
                icon={<InterestsIcon />}
                delay={0.4}
              >
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {interests.research.map((interest) => (
                    <Chip
                      key={interest}
                      label={interest}
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: theme.palette.primary.main + "50",
                        color: theme.palette.text.secondary,
                        "&:hover": {
                          backgroundColor: theme.palette.primary.main + "10",
                        },
                      }}
                    />
                  ))}
                </Box>
              </SectionCard>
            </Grid>

            {/* Hobbies */}
            <Grid size={{ xs: 12, md: 6 }}>
              <SectionCard
                title="Hobbies & Interests"
                icon={<SportsEsportsIcon />}
                delay={0.45}
              >
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                  {interests.hobbies.map((hobby) => (
                    <Chip
                      key={hobby.name}
                      label={`${hobby.emoji} ${hobby.name}`}
                      sx={{
                        backgroundColor: isDark
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(0, 0, 0, 0.05)",
                        color: theme.palette.text.primary,
                        fontSize: "0.85rem",
                      }}
                    />
                  ))}
                </Box>
              </SectionCard>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default SkillsView;
