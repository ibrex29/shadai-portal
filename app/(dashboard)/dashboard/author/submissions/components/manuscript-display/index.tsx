/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import FilterListIcon from "@mui/icons-material/FilterList";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";

import { ManuscriptProps } from "@/types";
import noResultIcon from "@/public/images/no_upcoming.svg";
import noManuscriptIcon from "@/public/images/no-tickets.svg";
import ManuscriptContent from "./inner-manuscript-display";
import ManuscriptSubHeader from "@/app/components/@dashboard/components/@dashboard/common/sub-header/my-manuscript";
import Pagination from "@/app/components/pagination";

interface ManuscriptDisplayProps {
  manuscripts: ManuscriptProps[];
  isFetching: boolean;
  availableManuscripts: boolean;
  page: number;
  limit: number;
  totalItems: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  sortOrder: string;
  setSortOrder: (sortOrder: string) => void;
  search: string;
  setSearch: (search: string) => void;
  status: string;
  setStatus: (status: string) => void;
}

const ManuscriptsDisplay: React.FC<ManuscriptDisplayProps> = ({
  manuscripts,
  isFetching,
  availableManuscripts,
  page,
  limit,
  totalItems,
  pageCount,
  hasPreviousPage,
  hasNextPage,
  setPage,
  setLimit,
  sortOrder,
  setSortOrder,
  search,
  setSearch,
  status,
  setStatus,
}) => {
  const [view, setView] = useState<"card" | "table" | "list">("card");

  return (
    <Box>
      <ManuscriptSubHeader
        title="Submitted Manuscripts"
        subtitle="Track and manage the manuscripts you’ve submitted."
      />
      <Paper
        sx={{
          backgroundColor: "white",
          py: 1,
          mx: "-30px",
          px: "30px",
          my: 0,
          boxShadow: "none",
          borderColor: "grey.300",
        }}
      >
        <Paper
          sx={{
            backgroundColor: "white",
            py: 2,
            px: 3,
            mb: 3,
            border: "1px solid",
            borderColor: "grey.300",
            borderRadius: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
          }}
        >
          {/* Search */}
          <TextField
            placeholder="Search manuscripts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{
              flex: 1,
              minWidth: 250,
              "& .MuiInputBase-input": {
                fontSize: "12px", // input text
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: "12px", // placeholder
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Status filter */}
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            displayEmpty
            size="small"
            sx={{ minWidth: 160, fontSize: "12px" }}
            startAdornment={
              <InputAdornment position="start">
                <FilterListIcon fontSize="small" />
              </InputAdornment>
            }
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="submitted">Submitted</MenuItem>
            <MenuItem value="in-review">In Review</MenuItem>
            <MenuItem value="accepted">Accepted</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>

          {/* Sort order */}
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            size="small"
            sx={{ minWidth: 160, fontSize: "12px" }}
            startAdornment={
              <InputAdornment position="start">
                <SortIcon fontSize="small" />
              </InputAdornment>
            }
          >
            <MenuItem value="asc">Oldest First</MenuItem>
            <MenuItem value="desc">Newest First</MenuItem>
          </Select>

          {/* View toggle */}
          <Box ml="auto">
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={(_, val) => val && setView(val)}
              size="small"
              sx={{
                overflow: "hidden",
                "& .MuiToggleButton-root": {
                  px: 2.5,
                  fontSize: "12px",
                  border: "1px solid",
                  borderColor: "divider",
                  "&:not(:first-of-type)": {
                    borderLeft: "none",
                  },
                },
              }}
            >
              <ToggleButton value="card">
                <ViewModuleIcon fontSize="small" />
              </ToggleButton>
              <ToggleButton value="table">
                <TableRowsIcon fontSize="small" />
              </ToggleButton>
              <ToggleButton value="list">
                <ViewListIcon fontSize="small" />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Paper>
        <ManuscriptContent
          isFetching={isFetching}
          manuscripts={manuscripts}
          availableManuscripts={availableManuscripts}
          noManuscriptsIcon={noManuscriptIcon}
          noResultManuscriptIcon={noResultIcon}
          view={view}
        />
        <Pagination
          page={page}
          limit={limit}
          pageCount={pageCount}
          onPageChange={setPage}
          onLimitChange={setLimit}
        />
      </Paper>
    </Box>
  );
};

export default ManuscriptsDisplay;
