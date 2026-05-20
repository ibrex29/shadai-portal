"use client";

import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Chip,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import useFetchREManuscripts from "@/app/(dashboard)/hooks/useFetchREManuscripts";

import ManuscriptsDisplay from "../../components/card";

const STATUS_FILTERS = [
  { label: "All", value: "" },
  { label: "Submitted", value: "SUBMITTED" },
  { label: "Under Review", value: "UNDER_REVIEW" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Rejected", value: "REJECTED" },
];

const SORT_FILTERS = [
  { label: "Latest", value: "desc" },
  { label: "Oldest", value: "asc" },
];

const REManuscriptTab: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { manuscripts, meta, isFetching, availableManuscripts } =
    useFetchREManuscripts({
      page,
      limit: 10,
      search,
      status,
      sortOrder,
    });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const handleSortChange = (value: "asc" | "desc") => {
    setSortOrder(value);
    setPage(1);
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
        mb={2}
        flexWrap="wrap"
        gap={1}
      >
        <TextField
          size="small"
          placeholder="Search manuscripts..."
          value={search}
          onChange={handleSearchChange}
          sx={{ minWidth: 220, maxWidth: 340 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" color="action" />
              </InputAdornment>
            ),
          }}
        />

        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {STATUS_FILTERS.map((filter) => (
            <Chip
              key={filter.value}
              label={filter.label}
              clickable
              color={status === filter.value ? "primary" : "default"}
              variant={status === filter.value ? "filled" : "outlined"}
              onClick={() => handleStatusChange(filter.value)}
              size="small"
            />
          ))}
        </Stack>

        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {SORT_FILTERS.map((filter) => (
            <Chip
              key={filter.value}
              label={filter.label}
              clickable
              color={sortOrder === filter.value ? "secondary" : "default"}
              variant={sortOrder === filter.value ? "filled" : "outlined"}
              onClick={() => handleSortChange(filter.value as "asc" | "desc")}
              size="small"
            />
          ))}
        </Stack>
      </Stack>

      <ManuscriptsDisplay
        manuscripts={manuscripts}
        isFetching={isFetching}
        availableManuscripts={availableManuscripts}
      />

      {meta && meta.pageCount > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {meta.itemCount} manuscript{meta.itemCount !== 1 ? "s" : ""}
          </Typography>
          <Pagination
            count={meta.pageCount}
            page={page}
            onChange={(_event, value) => setPage(value)}
            color="primary"
            size="small"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
};

export default REManuscriptTab;
