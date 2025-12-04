"use client";

import ProtectedRoutes from "@/Components/ProtectedRoutes";
import { useUserStore } from "@/store/userStore";
import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import NextLink from "@/Components/NextLink";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

export default function Users() {
  const [currentPage, setCurrentPage] = useState(0);
  const {
    users,
    total,
    isLoading,
    searchQuery,
    setPagination,
    searchUsers,
    fetchUsers,
  } = useUserStore();

  useEffect(() => {
    fetchUsers({ limit: 10, skip: 0 });
  }, [fetchUsers]);

  const handleSearch = useCallback(
    (e) => {
      searchUsers(e.target.value);
      setCurrentPage(0);
    },
    [searchUsers]
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
    back : { px:2,color : "#ddd", border: '1px solid #ddd', mb:2},
    header: { color: "#fff", mb: 3 },
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
    },
  },
    tableHeader: { backgroundColor: "#1e1e1e", color: "#fff" },
    tableCell: { color: "#ddd", borderColor: "#444" },
  };

  return (
    <ProtectedRoutes>
      <Box sx={styles.page}>
        <Container>
          <Button
           component={NextLink} 
           href="/dashboard"
          sx={styles.back} > ← Back</Button>
          <Typography variant="h4" sx={styles.header}>
            Users Management
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography sx={{ color: "#fff" }}>Total: {total}</Typography>
            <TextField
              label="Search users"
              value={searchQuery}
              size="small"
              sx={{ width: 300, ...styles.textField }}
              onChange={handleSearch}
            />
          </Box>

          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress sx={{ color: "#fff" }} />
            </Box>
          ) : (
            <>
              <TableContainer
                component={Paper}
                sx={{ backgroundColor: "#2a2a2a" }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={styles.tableHeader}>
                      <TableCell sx={styles.tableCell}>Name</TableCell>
                      <TableCell sx={styles.tableCell}>Email</TableCell>
                      <TableCell sx={styles.tableCell}>Gender</TableCell>
                      <TableCell sx={styles.tableCell}>Phone</TableCell>
                      <TableCell sx={styles.tableCell}>Company</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell sx={styles.tableCell}>
                          <NextLink href={`/users/${user.id}`} style={{textDecoration : 'none'}}>
                           <span style={{color: "#ffff",}}> {user.firstName} {user.lastName}</span>
                          </NextLink>
                        </TableCell>
                        <TableCell sx={styles.tableCell}>
                          {user.email}
                        </TableCell>
                        <TableCell sx={styles.tableCell}>
                          {user.gender}
                        </TableCell>
                        <TableCell sx={styles.tableCell}>
                          {user.phone}
                        </TableCell>
                        <TableCell sx={styles.tableCell}>
                          {user.company?.name || "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={total}
                rowsPerPage={10}
                page={currentPage}
                onPageChange={handlePageChange}
                sx={{ color: "#fff" }}
              />
            </>
          )}
        </Container>
      </Box>
    </ProtectedRoutes>
  );
}
