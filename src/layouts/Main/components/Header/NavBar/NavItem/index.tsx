/**
 * NavItem component.
 */
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUseStyles } from "react-jss";
import { TabSpec, TabLink } from "../../../../../../models";
import styles from "./styles";

const useStyles = createUseStyles(styles);

const NavItem: React.FC<TabSpec & TabLink> = ({
  name,
  url,
  mdFileName, // eslint-disable-line @typescript-eslint/no-unused-vars
  ...iconProps
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const onCloseClicked = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/");
  };

  return (
    <span className={classes.root}>
      <NavLink
        to={url}
        className={({ isActive }) =>
          isActive ? classes.currentTab : classes.otherTab
        }
      >
        <FontAwesomeIcon {...iconProps} size={iconProps.size || "lg"} />
        <span className={classes.navText}>{name}</span>
        <FontAwesomeIcon
          onClick={onCloseClicked}
          className="closeButton"
          icon="times"
          size="1x"
          title="Close"
        />
      </NavLink>
    </span>
  );
};

export default NavItem;
