/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import {
  Box,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

import { ManuscriptProps } from "@/types";
import noResultIcon from "@/public/images/no_upcoming.svg";
import noManuscriptIcon from "@/public/images/no-tickets.svg";
import ManuscriptSubHeader from "@/app/components/@dashboard/components/@dashboard/common/sub-header/my-manuscript";
import Pagination from "@/app/components/pagination";
import ManuscriptContent from "./card-content";

interface ManuscriptDisplayProps {
  manuscripts: ManuscriptProps[];
  isFetching: boolean;
  availableManuscripts: boolean;
  refetch: () => void;
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
  refetch,
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
        title="All Manuscripts"
        subtitle="View, filter and manage all submitted manuscripts."
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
        {/* Toolbar */}
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
              "& .MuiInputBase-input": { fontSize: "12px" },
              "& .MuiInputBase-input::placeholder": { fontSize: "12px" },
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
            <MenuItem value="SUBMITTED">Submitted</MenuItem>
            <MenuItem value="UNDER_REVIEW">Under Review</MenuItem>
            <MenuItem value="ACCEPTED">Accepted</MenuItem>
            <MenuItem value="REJECTED">Rejected</MenuItem>
            <MenuItem value="REVISION">Revision</MenuItem>
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
                  "&:not(:first-of-type)": { borderLeft: "none" },
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
          refetch={refetch}
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
