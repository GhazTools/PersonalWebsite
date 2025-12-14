/**
 * IconLink component - Modern dock-style icon with hover effects
 */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Badge, Box, Tooltip, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { ContactItem } from "../../models";

const IconLink: React.FC<ContactItem> = ({
  name,
  url,
  icon,
  isInternal,
  badge,
}) => {
  const theme = useTheme();
  const location = useLocation();
  const isDark = theme.palette.mode === "dark";
  const isActive = isInternal && location.pathname === url;

  const iconComp = (
    <Tooltip
      title={isInternal ? name : `Find me on ${name}`}
      placement="right"
      arrow
    >
      <Box
        component={motion.div}
        whileHover={{ scale: 1.15, y: -2 }}
        whileTap={{ scale: 0.95 }}
        sx={{
          width: 38,
          height: 38,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isActive
            ? isDark
              ? "rgba(102, 162, 251, 0.15)"
              : "rgba(102, 162, 251, 0.1)"
            : "transparent",
          color: isActive
            ? theme.palette.primary.main
            : theme.palette.text.secondary,
          transition: "all 0.2s ease",
          cursor: "pointer",
          position: "relative",
          "&:hover": {
            backgroundColor: isDark
              ? "rgba(102, 162, 251, 0.15)"
              : "rgba(102, 162, 251, 0.1)",
            color: theme.palette.primary.main,
          },
          // Active indicator dot
          "&::after": {
            content: '""',
            position: "absolute",
            left: -8,
            width: 3,
            height: isActive ? 20 : 0,
            borderRadius: "0 2px 2px 0",
            backgroundColor: theme.palette.primary.main,
            transition: "height 0.2s ease",
          },
          "&:hover::after": {
            height: 8,
          },
        }}
      >
        <Badge
          badgeContent={badge}
          color="error"
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "0.55rem",
              height: 14,
              minWidth: 14,
              padding: "0 3px",
              top: 2,
              right: 2,
            },
          }}
        >
          <FontAwesomeIcon icon={icon as IconProp} style={{ fontSize: 16 }} />
        </Badge>
      </Box>
    </Tooltip>
  );

  if (isInternal) {
    return (
      <Link
        to={url}
        key={`left-bar-${name}`}
        style={{ textDecoration: "none" }}
      >
        {iconComp}
      </Link>
    );
  }

  return (
    <a
      href={url}
      key={`left-bar-${name}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      {iconComp}
    </a>
  );
};

export default IconLink;
