/**
 * Container components used in tabs - Modernized with MUI
 */
import React from "react";
import { Box } from "@mui/material";
import SEO, { SEOProps } from "../SEO";

export interface ContainerProps {
  seo?: SEOProps;
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ seo, children }) => {
  return (
    <>
      {!!seo && <SEO {...seo} />}
      <Box
        sx={{
          maxWidth: "960px",
          px: 2.5,
          pt: 0,
          pb: 10,
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Container;
