"use client";

import { useAuthStore } from "@/store/authStore";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "emilys",
    password: "emilyspass",
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const { setAuth, isLoading } = useAuthStore();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const result = await setAuth(credentials);

    if (result?.success) {
      router.push("/dashboard");
    } else {
      setError(result?.error || "Login failed");
    }
  }

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#111",
      py: 4,
    },
    glassCard: {
      background: "rgba(30, 30, 30, 0.8)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "16px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    },
    textField: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: "8px",
      "& .MuiInputBase-input": { color: "#fff" },
      "& .MuiInputLabel-root": { color: "#aaa" },
    },
    glassButton: {
      background: "linear-gradient(45deg, #2a2a2a, #1a1a1a)",
      color: "#fff",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      "&:hover": {
        background: "linear-gradient(45deg, #333, #222)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      },
    },
  };

  return (
    <Box sx={styles.page}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, ...styles.glassCard }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h3" sx={{ color: "#fff", fontWeight: "bold" }}>
              Admin Login
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, backgroundColor: "rgba(255, 0, 0, 0.1)" }}>
              {error}
            </Alert>
          )}

          <Box component="form">
            <TextField
              fullWidth
              label="Username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              sx={{ ...styles.textField, mb: 2 }}
              InputProps={{ sx: { color: "#fff" } }}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              sx={{ ...styles.textField, mb: 3 }}
              InputProps={{ sx: { color: "#fff" } }}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              disabled={isLoading}
              sx={{ ...styles.glassButton, py: 1.5, fontSize: "1.1rem" }}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Box>

          <Typography sx={{ color: "#888", textAlign: "center", mt: 3 }}>
            Test: <strong style={{ color: "#fff" }}>emilys / emilyspass</strong>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}