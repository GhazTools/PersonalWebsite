/**
 * Tech Stack Badge Component and Color Mapping
 * Used across ProjectsView and ExperienceView
 */

import React from "react";
import { Box } from "@mui/material";

// Tech stack colors for badges
export const techColors: Record<string, { bg: string; text: string }> = {
  // Languages
  Python: { bg: "#3572A520", text: "#3572A5" },
  JavaScript: { bg: "#f7df1e20", text: "#b7a500" },
  TypeScript: { bg: "#3178c620", text: "#3178c6" },
  Java: { bg: "#b0721920", text: "#b07219" },
  "C++": { bg: "#f34b7d20", text: "#f34b7d" },
  C: { bg: "#55555520", text: "#555555" },
  Go: { bg: "#00ADD820", text: "#00ADD8" },
  Rust: { bg: "#dea58420", text: "#dea584" },
  Ruby: { bg: "#70151620", text: "#701516" },
  PHP: { bg: "#4F5D9520", text: "#4F5D95" },
  Swift: { bg: "#F0513820", text: "#F05138" },
  Kotlin: { bg: "#A97BFF20", text: "#A97BFF" },
  Dart: { bg: "#00B4AB20", text: "#00B4AB" },
  SQL: { bg: "#e38c0020", text: "#e38c00" },
  // Frameworks & Libraries
  React: { bg: "#61DAFB20", text: "#00b8d9" },
  Vue: { bg: "#4FC08D20", text: "#4FC08D" },
  Angular: { bg: "#DD003120", text: "#DD0031" },
  Node: { bg: "#33993320", text: "#339933" },
  "Node.js": { bg: "#33993320", text: "#339933" },
  Express: { bg: "#00000020", text: "#666666" },
  Flask: { bg: "#00000020", text: "#666666" },
  Django: { bg: "#09210020", text: "#092E20" },
  FastAPI: { bg: "#00968820", text: "#009688" },
  "Next.js": { bg: "#00000020", text: "#666666" },
  Gatsby: { bg: "#66339920", text: "#663399" },
  TensorFlow: { bg: "#FF6F0020", text: "#FF6F00" },
  PyTorch: { bg: "#EE4C2C20", text: "#EE4C2C" },
  Flutter: { bg: "#02569B20", text: "#02569B" },
  // Cloud & DevOps
  AWS: { bg: "#FF990020", text: "#FF9900" },
  GCP: { bg: "#4285F420", text: "#4285F4" },
  Azure: { bg: "#008AD720", text: "#008AD7" },
  Docker: { bg: "#2496ED20", text: "#2496ED" },
  Kubernetes: { bg: "#326CE520", text: "#326CE5" },
  Firebase: { bg: "#FFCA2820", text: "#dd9000" },
  // Databases
  MongoDB: { bg: "#47A24820", text: "#47A248" },
  PostgreSQL: { bg: "#33679120", text: "#336791" },
  Redis: { bg: "#DC382D20", text: "#DC382D" },
  MySQL: { bg: "#4479A120", text: "#4479A1" },
  SQLAlchemy: { bg: "#d7141420", text: "#d71414" },
  // Tools & Other
  Git: { bg: "#F0503020", text: "#F05030" },
  GraphQL: { bg: "#E1009820", text: "#E10098" },
  REST: { bg: "#00000020", text: "#666666" },
  "Apache Spark": { bg: "#E2573120", text: "#E25731" },
  OpenTelemetry: { bg: "#425CC720", text: "#425CC7" },
  Arduino: { bg: "#00979D20", text: "#00979D" },
  Selenium: { bg: "#43B02A20", text: "#43B02A" },
  NLP: { bg: "#8B5CF620", text: "#8B5CF6" },
  ML: { bg: "#8B5CF620", text: "#8B5CF6" },
  "Machine Learning": { bg: "#8B5CF620", text: "#8B5CF6" },
  API: { bg: "#10B98120", text: "#10B981" },
  // Web
  HTML: { bg: "#e34c2620", text: "#e34c26" },
  CSS: { bg: "#563d7c20", text: "#563d7c" },
  SCSS: { bg: "#c6538c20", text: "#c6538c" },
  Tailwind: { bg: "#38B2AC20", text: "#38B2AC" },
};

interface TechBadgeProps {
  tech: string;
  isDark: boolean;
  size?: "small" | "medium";
}

export const TechBadge: React.FC<TechBadgeProps> = ({
  tech,
  isDark,
  size = "small",
}) => {
  const colors = techColors[tech] || {
    bg: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
    text: isDark ? "#abb2bf" : "#666666",
  };

  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: size === "small" ? 1 : 1.25,
        py: size === "small" ? 0.25 : 0.5,
        borderRadius: 1,
        backgroundColor: colors.bg,
        color: colors.text,
        fontSize: size === "small" ? "0.7rem" : "0.75rem",
        fontFamily: "monospace",
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {tech}
    </Box>
  );
};

export default TechBadge;
