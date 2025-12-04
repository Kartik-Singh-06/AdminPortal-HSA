"use client";

import axios from "axios";
import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  users: [],
  total: 0,
  limit: 10,
  skip: 0,
  searchQuery: "",
  isLoading: false,

  fetchUsers: async ({ limit = 10, skip = 0, search = "" }) => {

    set({ isLoading: true });

    try {
      const url = search
        ? `https://dummyjson.com/users/search?q=${encodeURIComponent(
            search
          )}&limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

      const res = await axios.get(url);
      console.log("RES users : ", res )
      set({
        users: res.data.users || [],
        total: res.data.total || 0,
        limit,
        skip,
      });
    } catch (err) {
      console.log("User fetch error : ", err);
    } finally {
      set({ isLoading: false });
    }
  },
  searchUsers: (query) => {
    set({ searchQuery: query, skip: 0 });
    get().fetchUsers({ limit: 10, skip: 0, search: query });
  },
  setPagination: (page) => {
    const skip = (page - 1) * 10;
    set({ skip });
    get().fetchUsers({ limit: 10, skip, search: get().searchQuery });
  },
}));
