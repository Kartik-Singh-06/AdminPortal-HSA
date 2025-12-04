import { Category } from "@mui/icons-material";
import axios from "axios";
import { create } from "zustand";

export const useProductStore = create((set, get) => ({
  products: [],
  total: 0,
  isLoading: false,
  searchQuery: "",
  limit: 10,
  category: "all",
  skip: 0,
  categories: [],

  fetchProducts: async ({
    limit = 10,
    skip = 0,
    search = "",
    category = "all",
  }) => {
    set({ isLoading: true });

    try {
      let url;
      if (search) {
        url = `https://dummyjson.com/products/search?q=${encodeURIComponent(
          search
        )}&limit=${limit}&skip=${skip}`;
      } else if (category !== "all") {
        url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
      } else {
        url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      }
      const res = await axios.get(url);
      set({
        products: res.data.products || [],
        total: res.data.total || 0,
        limit,
        skip,
      })
    } catch (err) {
      console.error("Fetching products Error", err);
    } finally {
      set({ isLoading: false });
    }
  },

  searchProducts : (query) =>{
    set({ searchQuery: query, skip: 0 });
     get().fetchProducts({ limit: 10, skip: 0, search: query });
  },
  filterByCategory: (category) => {
    set({ category, skip: 0, searchQuery: '' });
    get().fetchProducts({ limit: 10, skip: 0, category });
  },
  setPagination: (page) => {
    const skip = (page - 1) * 10;
    set({ skip });
    get().fetchProducts({ 
      limit: 10, 
      skip, 
      search: get().searchQuery, 
      category: get().category 
    });
  },
fetchCategories: async () => {
  try {
    set({ isLoading: true });

    const response = await axios.get("https://dummyjson.com/products/categories");
    let data = response.data;

    if (!Array.isArray(data)) data = [];

    const categories = data.map((c) =>
      typeof c === "string"
        ? c
        : typeof c === "object" && c?.slug
        ? c.slug
        : String(c)
    );

    set({ categories });
  } catch (error) {
    console.error("Categories fetch error:", error);
    set({ categories: [] });
  } finally {
    set({ isLoading: false });
  }
},

}));
