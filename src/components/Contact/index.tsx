/* eslint-disable react/prop-types */
/**
 * Contact Section - A form that sends emails via mailto
 * VS Code / macOS inspired design with form validation
 */

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";

interface ContactProps {
  email?: string;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC<ContactProps> = ({
  email = "ghazanfarshahbaz2409@gmail.com",
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields",
        severity: "error",
      });
      return;
    }

    // Construct mailto link
    const subject = encodeURIComponent(
      `[Portfolio Contact] ${formData.subject}`,
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    );
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    setSnackbar({
      open: true,
      message: "Opening your email client...",
      severity: "success",
    });

    // Reset form after successful submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: isDark
        ? "rgba(40, 44, 52, 0.6)"
        : "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(8px)",
      borderRadius: 2,
      fontFamily: "monospace",
      "& fieldset": {
        borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
      },
      "&:hover fieldset": {
        borderColor: isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
    },
    "& .MuiInputLabel-root": {
      color: isDark ? "#9599a0" : "#86868b",
      fontFamily: "monospace",
      "&.Mui-focused": {
        color: theme.palette.primary.main,
      },
    },
    "& .MuiOutlinedInput-input": {
      color: isDark ? "#f3f3f3" : "#1d1d1f",
    },
  };

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        py: 10,
        position: "relative",
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.5,
                mb: 2,
              }}
            >
              <EmailIcon
                sx={{
                  fontSize: 36,
                  color: theme.palette.primary.main,
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: theme.palette.text.primary,
                  fontSize: { xs: "1.75rem", md: "2.5rem" },
                }}
              >
                Get In Touch
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 500,
                mx: "auto",
              }}
            >
              Have a project in mind or want to discuss opportunities? I&apos;d
              love to hear from you!
            </Typography>
          </Box>

          {/* Contact Form Card */}
          <Box
            component={motion.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            sx={{
              p: { xs: 3, md: 5 },
              background: isDark
                ? "rgba(33, 37, 43, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(12px)",
              borderRadius: 3,
              border: isDark
                ? "1px solid rgba(255, 255, 255, 0.08)"
                : "1px solid rgba(0, 0, 0, 0.1)",
              boxShadow: isDark
                ? "0 8px 32px rgba(0, 0, 0, 0.3)"
                : "0 4px 24px rgba(0, 0, 0, 0.08)",
            }}
          >
            {/* Name & Email Row */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
                mb: 3,
              }}
            >
              <TextField
                name="name"
                label="Your Name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
                sx={textFieldSx}
              />
              <TextField
                name="email"
                label="Your Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                sx={textFieldSx}
              />
            </Box>

            {/* Subject */}
            <TextField
              name="subject"
              label="Subject"
              value={formData.subject}
              onChange={handleChange}
              error={!!errors.subject}
              helperText={errors.subject}
              fullWidth
              sx={{ ...textFieldSx, mb: 3 }}
            />

            {/* Message */}
            <TextField
              name="message"
              label="Message"
              value={formData.message}
              onChange={handleChange}
              error={!!errors.message}
              helperText={errors.message}
              multiline
              rows={5}
              fullWidth
              sx={{ ...textFieldSx, mb: 4 }}
            />

            {/* Submit Button */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                endIcon={<SendIcon />}
                sx={{
                  px: 5,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontFamily: "monospace",
                  textTransform: "none",
                  fontSize: "1rem",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #42a5f5 100%)`,
                  boxShadow: `0 4px 20px ${theme.palette.primary.main}40`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 8px 30px ${theme.palette.primary.main}60`,
                  },
                }}
              >
                Send Message
              </Button>
            </Box>

            {/* Direct email link */}
            <Typography
              variant="caption"
              sx={{
                display: "block",
                textAlign: "center",
                mt: 3,
                color: theme.palette.text.secondary,
              }}
            >
              Or email me directly at{" "}
              <Box
                component="a"
                href={`mailto:${email}`}
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  fontWeight: 600,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {email}
              </Box>
            </Typography>
          </Box>
        </motion.div>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
