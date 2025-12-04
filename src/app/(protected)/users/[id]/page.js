"use client";

import ProtectedRoutes from "@/Components/ProtectedRoutes";
import { Avatar, Button, Card, CardContent, Chip, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/material";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/users/${id}`);
        if (!res.ok) {
          new Error("Network Issue something went wrong.");
        }
        console.log("data : ", res.data);
        setUser(res.data);
      } catch (err) {
        console.error("User Fetch Error ", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  const styles = {
    page: { backgroundColor: "#121212", minHeight: "100vh", py: 4 },
    header: { color: "#fff", mb: 3 },
    card: {
      backgroundColor: "#2a2a2a",
      color: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
    chip: {
      color: "#fff",
      backgroundColor: "#424242",
      mr: 1,
      mb: 1,
    },
    backButton: {
      borderColor: "#555",
      color: "#fff",
      mb: 3,
      "&:hover": {
        borderColor: "#777",
        backgroundColor: "rgba(255,255,255,0.05)",
      },
    },
    label: { color: "#aaa", display: "inline-block", width: 120 },
    value: { color: "#fff", display: "inline-block" },
  };

  if (isLoading) {
    return (
      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "100vh",
        backgroundColor: "#121212"
      }}>
        <CircularProgress sx={{ color: "#fff" }} />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ 
        backgroundColor: "#121212", 
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Typography variant="h4" sx={{ color: "#fff", textAlign: "center" }}>
          User not found
        </Typography>
      </Box>
    );
  }

  return (
    <ProtectedRoutes>
      <Box sx={styles.page}>
        <Container>
          <Button 
            onClick={() => router.back()} 
            variant="outlined" 
            sx={styles.backButton}
          >
            ← Back to Users
          </Button>

          <Card sx={styles.card}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Avatar
                    sx={{ 
                      width: { xs: 100, sm: 120, md: 150 }, 
                      height: { xs: 100, sm: 120, md: 150 }, 
                      my: 2,
                      border: "3px solid #424242"
                    }}
                    src={user.image}
                  >
                    {user.firstName?.[0]}
                    {user.lastName?.[0]}
                  </Avatar>
                  
                  <Box sx={{ textAlign: "center", mt: 2 }}>
                    <Typography variant="h5" sx={{ color: "#fff", fontWeight: 600 }}>
                      {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#aaa", mb: 2 }}>
                      @{user.username}
                    </Typography>
                    
                    <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                      <Chip 
                        label={user.gender} 
                        sx={styles.chip} 
                        size="small" 
                      />
                      <Chip 
                        label={user.role || "User"} 
                        sx={styles.chip} 
                        size="small" 
                      />
                    </Box>
                  </Box>
                </Grid>

                {/* Details Section */}
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" sx={{ color: "#fff", mb: 3, borderBottom: "1px solid #444", pb: 1 }}>
                    Personal Information
                  </Typography>
                  
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box>
                      <Typography component="span" sx={styles.label}>
                        Email:
                      </Typography>
                      <Typography component="span" sx={styles.value}>
                        {user.email}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography component="span" sx={styles.label}>
                        Phone:
                      </Typography>
                      <Typography component="span" sx={styles.value}>
                        {user.phone}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography component="span" sx={styles.label}>
                        Birth Date:
                      </Typography>
                      <Typography component="span" sx={styles.value}>
                        {user.birthDate || "N/A"}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography component="span" sx={styles.label}>
                        Age:
                      </Typography>
                      <Typography component="span" sx={styles.value}>
                        {user.age || "N/A"}
                      </Typography>
                    </Box>
                    
                    {user.company?.name && (
                      <Box>
                        <Typography component="span" sx={styles.label}>
                          Company:
                        </Typography>
                        <Typography component="span" sx={styles.value}>
                          {user.company.name}
                        </Typography>
                      </Box>
                    )}
                    
                    {user.university && (
                      <Box>
                        <Typography component="span" sx={styles.label}>
                          University:
                        </Typography>
                        <Typography component="span" sx={styles.value}>
                          {user.university}
                        </Typography>
                      </Box>
                    )}
                    
                    <Box>
                      <Typography component="span" sx={styles.label}>
                        Department:
                      </Typography>
                      <Typography component="span" sx={styles.value}>
                        {user.company?.department || "N/A"}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Address Section */}
                  {user.address && (
                    <>
                      <Typography variant="h6" sx={{ color: "#fff", mt: 4, mb: 2, borderBottom: "1px solid #444", pb: 1 }}>
                        Address
                      </Typography>
                      
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <Typography sx={{ color: "#fff" }}>
                          {user.address.address}
                        </Typography>
                        <Typography sx={{ color: "#aaa" }}>
                          {user.address.city}, {user.address.state} {user.address.postalCode}
                        </Typography>
                        <Typography sx={{ color: "#aaa" }}>
                          {user.address.country}
                        </Typography>
                      </Box>
                    </>
                  )}
                  
                  <Box sx={{ mt: 4, display: "flex", flexWrap: "wrap", gap: 2 }}>
                    {user.height && (
                      <Chip 
                        label={`Height: ${user.height}cm`} 
                        sx={styles.chip} 
                        size="small" 
                      />
                    )}
                    {user.weight && (
                      <Chip 
                        label={`Weight: ${user.weight}kg`} 
                        sx={styles.chip} 
                        size="small" 
                      />
                    )}
                    {user.bloodGroup && (
                      <Chip 
                        label={`Blood: ${user.bloodGroup}`} 
                        sx={styles.chip} 
                        size="small" 
                      />
                    )}
                    {user.eyeColor && (
                      <Chip 
                        label={`Eyes: ${user.eyeColor}`} 
                        sx={styles.chip} 
                        size="small" 
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </ProtectedRoutes>
  );
}