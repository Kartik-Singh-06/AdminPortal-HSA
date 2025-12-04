import axios from "axios";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,

  setAuth: async ({ username, password }) => {
    
    try {
      set({ isLoading: true });

      const res = await axios.post(
        "https://dummyjson.com/auth/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("LOGIN RAW RESPONSE:", res);

      if (res.status !== 200) {
        return { success: false, error: res.message || "Login failed" };
      }

      if (res.data.accessToken) {
        const user = {
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          gender: res.data.gender,
          image: res.data.image,
        };

        console.log("User :", user)
        set({
          token: res.data.accessToken,
          user,
          isAuthenticated: true,
        });

        if (typeof window !== "undefined") {
          localStorage.setItem("token", res.accessToken);
        }
        return { success: true };
      }
      return { success: false, error: "Invalid response from server" };
    } catch (err) {
      console.error("Auth Error : ", err);
      return { success: false, error: 'Invalid credentials' };
    } finally {
      set({ isLoading: false });
    }
  },

  logout : ()=>{
    set({token : null, user : null, isAuthenticated : false})
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },

  loadFromLocalStorage : () =>{
    if( typeof window == "undefined") return;
    const token = localStorage.getItem("token");
    if(token) set({token, isAuthenticated : true})
  }
}));
