/**
 * LeftBar component - Modernized with MUI
 */
import React from "react";
import { Box, Divider } from "@mui/material";
import IconLink from "../../../../components/IconLink";
import { ContactItem } from "../../../../models";
import { pages } from "./../../../../data";

export interface LeftBarProps {
  contactData: ContactItem[];
}

const LeftBar: React.FC<LeftBarProps> = ({ contactData }) => {
  // Internal links.
  const internals = pages.map(({ name, url, icon, isInternal, badge }) => ({
    name,
    url,
    icon,
    isInternal,
    badge,
  }));

  const bottom: ContactItem[] = [
    {
      name: "Useless button!",
      url: "",
      icon: "cog",
      isInternal: true,
    },
  ];

  const renderData = (data: ContactItem[]) => {
    return data.map((contactItem) => (
      <IconLink key={contactItem.name} {...contactItem} />
    ));
  };

  return (
    <Box
      sx={{
        width: 48,
        height: "100vh",
        backgroundColor: "rgba(33, 37, 43, 0.95)",
        backdropFilter: "blur(10px)",
        borderRight: "1px solid rgba(255, 255, 255, 0.05)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        py: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        {renderData(internals)}
        <Divider
          sx={{
            width: "60%",
            my: 1,
            borderColor: "rgba(255, 255, 255, 0.1)",
          }}
        />
        {renderData(contactData)}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {renderData(bottom)}
      </Box>
    </Box>
  );
};

export default LeftBar;
