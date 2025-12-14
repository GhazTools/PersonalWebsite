/**
 * NavItem component - Sleek macOS-inspired design
 */
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, IconButton, useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TabSpec, TabLink } from "../../../../../../models";

const NavItem: React.FC<TabSpec & TabLink> = ({
  name,
  url,
  mdFileName, // eslint-disable-line @typescript-eslint/no-unused-vars
  ...iconProps
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const onCloseClicked = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/");
  };

  return (
    <NavLink to={url} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 0.75,
            position: "relative",
            color: isActive
              ? theme.palette.primary.main
              : theme.palette.text.secondary,
            transition: "color 0.2s ease-in-out",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: 500,
            height: "100%",
            "&:hover": {
              color: theme.palette.primary.main,
              "& .closeButton": {
                opacity: 1,
              },
            },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: isActive ? "80%" : "0%",
              height: "2px",
              backgroundColor: theme.palette.primary.main,
              transition: "width 0.3s ease-in-out",
            },
            "&:hover::after": {
              width: "80%",
            },
          }}
        >
          <FontAwesomeIcon {...iconProps} size="sm" />
          <Box component="span">{name}</Box>
          <IconButton
            onClick={onCloseClicked}
            className="closeButton"
            size="small"
            sx={{
              p: 0.25,
              opacity: 0,
              transition: "opacity 0.2s",
              color: "inherit",
              ml: 0.5,
              "&:hover": {
                backgroundColor: "rgba(102, 162, 251, 0.2)",
              },
            }}
          >
            <FontAwesomeIcon icon="times" size="xs" />
          </IconButton>
        </Box>
      )}
    </NavLink>
  );
};

export default NavItem;
