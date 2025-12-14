/**
 * MDTab component - Modernized with MUI typography
 */
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Box, useTheme } from "@mui/material";
import Container from "../Container";

export interface MDTabProps {
  fileName: string;
}

const MDTab: React.FC<MDTabProps> = ({ fileName }) => {
  const [contents, setContents] = useState<string>("");
  const theme = useTheme();

  useEffect(() => {
    const loadFile = async () => {
      const file = await import(`../../data/tabs/${fileName}.md`);
      const response = await fetch(file.default);
      const text = await response.text();
      setContents(text);
    };
    loadFile();
  }, [fileName]);

  return (
    <Container seo={{ title: fileName }}>
      <Box
        sx={{
          pb: 10,
          maxWidth: "900px",
          fontFamily: theme.typography.fontFamily,
          "& p": {
            fontSize: "1rem",
            lineHeight: 1.6,
            marginBottom: 1.5,
            color: "#abb2bf",
          },
          "& h1": {
            fontSize: "1.75rem",
            fontWeight: 400,
            marginBottom: 2,
            marginTop: 2,
            color: "#42a5f5",
          },
          "& h2": {
            fontSize: "1.5rem",
            fontWeight: 400,
            marginBottom: 1.5,
            marginTop: 2.5,
            color: "#42a5f5",
          },
          "& h3": {
            fontSize: "1.25rem",
            fontWeight: 500,
            marginBottom: 1,
            marginTop: 2,
            color: "#42a5f5",
          },
          "& h4": {
            fontSize: "1.1rem",
            fontWeight: 500,
            marginBottom: 1,
            marginTop: 1.5,
            color: "#42a5f5",
          },
          "& ul, & ol": {
            paddingLeft: 4,
            marginBottom: 1.5,
            marginTop: 0.5,
            "& li": {
              fontSize: "1rem",
              lineHeight: 1.6,
              marginBottom: 0.5,
              color: "#abb2bf",
              "&::marker": {
                color: "#abb2bf",
              },
            },
            "& ul, & ol": {
              marginTop: 0.5,
              marginBottom: 0.5,
            },
          },
          "& strong": {
            fontWeight: 600,
            color: "#abb2bf",
          },
          "& em": {
            fontStyle: "italic",
            color: "#abb2bf",
          },
          "& code": {
            backgroundColor: "rgba(102, 162, 251, 0.15)",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "0.9em",
            fontFamily:
              "'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace",
            color: "#abb2bf",
          },
          "& pre": {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            padding: 2,
            borderRadius: 2,
            overflow: "auto",
            marginBottom: 2,
            marginTop: 1,
            border: `1px solid rgba(255, 255, 255, 0.1)`,
            "& code": {
              backgroundColor: "transparent",
              padding: 0,
              color: "#abb2bf",
            },
          },
          "& a": {
            color: "#42a5f5",
            textDecoration: "none",
            borderBottom: `1px solid transparent`,
            transition: "all 0.2s",
            "&:hover": {
              borderBottomColor: "#42a5f5",
              color: "#66b3ff",
            },
          },
          "& blockquote": {
            borderLeft: `3px solid #42a5f5`,
            paddingLeft: 2,
            marginLeft: 0,
            marginBottom: 2,
            marginTop: 1,
            fontStyle: "italic",
            color: "#909295",
          },
          "& hr": {
            border: "none",
            borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
            marginTop: 2,
            marginBottom: 2,
          },
          "& table": {
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: 2,
            marginTop: 1,
            "& th, & td": {
              padding: 1.5,
              textAlign: "left",
              borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
              fontSize: "0.95rem",
            },
            "& th": {
              fontWeight: 600,
              color: "#42a5f5",
              backgroundColor: "rgba(66, 165, 245, 0.05)",
            },
            "& td": {
              color: "#abb2bf",
            },
          },
        }}
      >
        <ReactMarkdown>{contents}</ReactMarkdown>
      </Box>
    </Container>
  );
};

export default MDTab;
