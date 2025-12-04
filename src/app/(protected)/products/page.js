"use client";

import { useEffect, useCallback, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TablePagination,
  CircularProgress,
  Box,
  Chip,
  Button,
} from "@mui/material";
import NextLink from "@/Components/NextLink";
import { useProductStore } from "@/store/productStore";
import ProtectedRoutes from "@/Components/ProtectedRoutes";
import { useRouter } from "next/navigation";

export default function ProductsPageInner() {
  const [currentPage, setCurrentPage] = useState(0);
  const {
    products,
    total,
    isLoading,
    searchQuery,
    category,
    categories,
    searchProducts,
    filterByCategory,
    setPagination,
    fetchCategories,
  } = useProductStore();
  const router = useRouter();
  useEffect(() => {
    fetchCategories();
    searchProducts("");
  }, [fetchCategories, searchProducts]);

  const handleSearch = useCallback(
    (e) => {
      searchProducts(e.target.value);
      setCurrentPage(0);
    },
    [searchProducts]
  );

  const handleCategoryChange = useCallback(
    (e) => {
      filterByCategory(e.target.value);
      setCurrentPage(0);
    },
    [filterByCategory]
  );

  const handlePageChange = useCallback(
    (e, page) => {
      setCurrentPage(page);
      setPagination(page + 1);
    },
    [setPagination]
  );

  const styles = {
    page: { backgroundColor: "#121212", minHeight: "100vh", py: 4 },
    header: { color: "#fff", mb: 3, fontWeight: 600 },
    textField: {
      backgroundColor: "#2a2a2a",
      borderRadius: "4px",
      "& .MuiInputBase-root": {
        color: "#fff",
      },
      "& .MuiInputLabel-root": {
        color: "#aaa",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#555",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#777",
      },

      "& .Mui-focused fieldset": {
        borderColor: "#fff !important",
        color: "#fff !important",
      },
    },
    select: {
      backgroundColor: "#2a2a2a",
      color: "#fff",
      borderRadius: "4px",
      "& .MuiOutlinedInput-notchedOutline": { borderColor: "#555" },
      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#777" },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
      "& .MuiSelect-icon": { color: "#fff" },
    },
    card: {
      backgroundColor: "#2a2a2a",
      color: "#fff",
      width: "230px",
      borderRadius: "12px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.2s, box-shadow 0.2s",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
        backgroundColor: "#303030",
      },
    },
    chip: {
      backgroundColor: "#424242",
      color: "#fff",
      fontSize: "0.75rem",
    },
    pagination: {
      color: "#fff",
      "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
        {
          color: "#fff",
        },
      "& .MuiIconButton-root": {
        color: "#fff",
        "&.Mui-disabled": { color: "#666" },
      },
    },
  };

  return (
    <ProtectedRoutes>
      <Box sx={styles.page}>
        <Container>
          <Button
            onClick={() => router.back()}
            variant="outlined"
            sx={{ px:2, color : "#ddd", border: '1px solid #ddd', mb:2}}
          >
             ← Back 
          </Button>
          <Typography variant="h4" sx={styles.header}>
            Products Management
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 4,
              flexWrap: { xs: "wrap", sm: "nowrap" },
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TextField
              label="Search products"
              value={searchQuery}
              onChange={handleSearch}
              size="small"
              sx={{
                minWidth: { xs: "100%", sm: 220 },
                ...styles.textField,
              }}
            />
            <FormControl
              size="small"
              sx={{
                minWidth: { xs: "100%", sm: 200 },
              }}
            >
              <InputLabel sx={{ color: "#aaa" }}>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={handleCategoryChange}
                sx={styles.select}
              >
                <MenuItem
                  value="all"
                  sx={{ color: "#fff", backgroundColor: "#2a2a2a" }}
                >
                  All Categories
                </MenuItem>
                {categories.map((cat, index) => {
                  const value =
                    typeof cat === "string"
                      ? cat
                      : typeof cat === "object" && cat?.slug
                      ? cat.slug
                      : String(cat);
                  const label =
                    value.charAt(0).toUpperCase() +
                    value.slice(1).replace(/-/g, " ");

                  return (
                    <MenuItem
                      key={index}
                      value={value}
                      sx={{ color: "#bdbdbdff", backgroundColor: "#2a2a2a" }}
                    >
                      {label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>

          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress sx={{ color: "#fff" }} />
            </Box>
          ) : (
            <>
              <Typography sx={{ color: "#aaa", mb: 3 }}>
                Showing {products.length} of {total} products
              </Typography>

              {/* Product cards */}
              <Grid container spacing={3} justifyContent="center">
                {products.map((product) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={product.id}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <NextLink
                      href={`/products/${product.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card sx={styles.card}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={product.thumbnail}
                          alt={product.title}
                          sx={{
                            objectFit: "cover",
                            borderTopLeftRadius: "12px",
                            borderTopRightRadius: "12px",
                          }}
                        />
                        <CardContent sx={{ flexGrow: 1, p: 2 }}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            sx={{
                              color: "#fff",
                              fontWeight: 500,
                              minHeight: "48px",
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {product.title}
                          </Typography>

                          <Typography
                            variant="h6"
                            sx={{
                              color: "#4dabf5",
                              fontWeight: 600,
                              mb: 1,
                            }}
                          >
                            ${product.price}
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mt: "auto",
                            }}
                          >
                            <Chip
                              label={product.category}
                              size="small"
                              sx={styles.chip}
                            />
                            <Typography
                              variant="body2"
                              sx={{ color: "#ffb74d" }}
                            >
                              ★ {product.rating || "N/A"}
                            </Typography>
                          </Box>

                          {product.stock !== undefined && (
                            <Typography
                              variant="caption"
                              sx={{
                                color:
                                  product.stock > 0 ? "#81c784" : "#f44336",
                                mt: 1,
                                display: "block",
                              }}
                            >
                              {product.stock > 0
                                ? `${product.stock} in stock`
                                : "Out of stock"}
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </NextLink>
                  </Grid>
                ))}
              </Grid>

              {/* Pagination */}
              <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={total}
                rowsPerPage={10}
                page={currentPage}
                onPageChange={handlePageChange}
                sx={styles.pagination}
              />
            </>
          )}
        </Container>
      </Box>
    </ProtectedRoutes>
  );
}
