"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { loadFromLocalStorage, isAuthenticated } = useAuthStore();
  console.log("Authentication", isAuthenticated)
  
  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  return null;
}
