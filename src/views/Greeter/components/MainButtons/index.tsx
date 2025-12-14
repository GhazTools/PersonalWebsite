/**
 * MainButtons component - Modernized with MUI
 */
import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { motion } from "framer-motion";
import { ContactItem } from "../../../../models";

export interface MainButtonsProps {
  contactData: ContactItem[];
  repoUrl: string;
}

const MainButtons: React.FC<MainButtonsProps> = ({ contactData, repoUrl }) => {
  const theme = useTheme();
  const mainContact = contactData.find((c) => c.isMain) as ContactItem;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        mt: 4,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {mainContact && (
        <Button
          component={motion.a}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          href={mainContact.url}
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          size="large"
          startIcon={<FontAwesomeIcon icon={mainContact.icon as IconProp} />}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 3,
            boxShadow: "0 4px 14px 0 rgba(102, 162, 251, 0.4)",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
              boxShadow: "0 6px 20px 0 rgba(102, 162, 251, 0.6)",
            },
          }}
        >
          Get in Touch
        </Button>
      )}

      <Button
        component={motion.a}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        variant="outlined"
        size="large"
        startIcon={<FontAwesomeIcon icon={["fab", "github"] as IconProp} />}
        sx={{
          color: "#abb2bf",
          borderColor: "rgba(171, 178, 191, 0.3)",
          px: 4,
          py: 1.5,
          fontSize: "1rem",
          fontWeight: 600,
          textTransform: "none",
          borderRadius: 3,
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          "&:hover": {
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            backgroundColor: "rgba(102, 162, 251, 0.1)",
          },
        }}
      >
        View Source
      </Button>
    </Box>
  );
};

export default MainButtons;
