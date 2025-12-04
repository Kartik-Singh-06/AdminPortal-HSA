"use client";

import { useAuthStore } from "@/store/authStore";
import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function ProtectedRoutes({ children }) {
  const router = useRouter();
  const { isAuthenticated, loadFromLocalStorage } = useAuthStore();
  const [checkAuth, setCheckAuth] = useState(false);

  useEffect(() => {
    loadFromLocalStorage();
    setCheckAuth(true);
  }, [loadFromLocalStorage]);

  useEffect(() => {
    if (checkAuth && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, checkAuth, router]);

  if (!checkAuth) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null;
  }
  return children;
}

export default ProtectedRoutes;
