/**
 * IconLink component - Modernized with MUI
 */
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Badge, IconButton, useTheme } from "@mui/material";
import { ContactItem } from "../../models";

const IconLink: React.FC<ContactItem> = ({
  name,
  url,
  icon,
  isInternal,
  badge,
}) => {
  const theme = useTheme();

  const iconComp = (
    <IconButton
      aria-label={isInternal ? name : `Find me on ${name}`}
      title={isInternal ? name : `Find me on ${name}`}
      sx={{
        color: "#9599a0",
        transition: "all 0.2s ease-in-out",
        padding: "6px",
        "&:hover": {
          color: theme.palette.primary.main,
          backgroundColor: "rgba(102, 162, 251, 0.1)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Badge
        badgeContent={badge}
        color="error"
        sx={{
          "& .MuiBadge-badge": {
            fontSize: "0.6rem",
            height: "14px",
            minWidth: "14px",
            padding: "0 3px",
          },
        }}
      >
        <FontAwesomeIcon icon={icon as IconProp} size="sm" />
      </Badge>
    </IconButton>
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
