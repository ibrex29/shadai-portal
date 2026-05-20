/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import {
  Box,
  Pagination as MuiPagination,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

interface PaginationProps {
  page: number;
  limit: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  limit,
  pageCount,
  onPageChange,
  onLimitChange,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={3}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="body2" color="text.secondary">
          Items per page:
        </Typography>
        <Select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          size="small"
          sx={{ minWidth: 80 }}
        >
          {[5, 10, 20, 50].map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <MuiPagination
        count={pageCount}
        page={page}
        onChange={(_, newPage) => onPageChange(newPage)}
        color="primary"
        size="small"
        sx={{ "& .MuiPaginationItem-root": { borderRadius: "8px" } }}
      />
    </Box>
  );
};

export default Pagination;
