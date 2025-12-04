"use client";

import ProtectedRoutes from "@/Components/ProtectedRoutes";
import { useAuthStore } from "@/store/authStore";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import NextLink from "@/Components/NextLink";

function Dashboard() {
  const { logout, user } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <ProtectedRoutes>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#121212",
        }}
      >
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#1e1e1e",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          <Toolbar>
            <Typography
              variant="h5"
              sx={{
                flexGrow: 1,
                color: "#fff",
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
              }}
            >
              Admin Dashboard
            </Typography>
            <Typography
              sx={{
                mr: 2,
                color: "#fff",
                fontSize: { xs: "0.875rem", sm: "1rem" },
                display: { xs: "none", sm: "block" },
              }}
            >
              Welcome, {user?.firstName || "Admin"}
            </Typography>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#555",
                color: "#fff",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                padding: { xs: "4px 8px", sm: "6px 16px" },
                "&:hover": {
                  borderColor: "#888",
                  backgroundColor: "rgba(255,255,255,0.05)",
                },
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container sx={{ mt: 4, py: 2 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: "#fff",
              mb: 4,
            }}
          >
            Management Panel
          </Typography>

          <Grid container spacing={3}>
            {/* Users Card */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  backgroundColor: "#2a2a2a",
                  color: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  "&:hover": {
                    boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom sx={{ color: "#fff" }}>
                    Users
                  </Typography>
                  <Typography sx={{ color: "#ccc", mb: 2 }}>
                    Manage users with search & pagination
                  </Typography>
                  <Button
                    component={NextLink}
                    href="/users"
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: "#3a3a3a",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#4a4a4a",
                      },
                    }}
                    fullWidth
                  >
                    Go to Users
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Products Card */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  backgroundColor: "#2a2a2a",
                  color: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  "&:hover": {
                    boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom sx={{ color: "#fff" }}>
                    Products
                  </Typography>
                  <Typography sx={{ color: "#ccc", mb: 2 }}>
                    Manage products with filters & search
                  </Typography>
                  <Button
                    component={NextLink}
                    href="/products"
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: "#3a3a3a",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#4a4a4a",
                      },
                    }}
                    fullWidth
                  >
                    Go to Products
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ProtectedRoutes>
  );
}

export default Dashboard;
