"use client";

import {
  Box,
  Chip,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

import useFetchSEManuscripts from "@/app/(dashboard)/hooks/useFetchSEManuscripts";

import ManuscriptsDisplay from "../../components/card";

const STATUS_FILTERS = [
  { label: "All", value: "" },
  { label: "Submitted", value: "SUBMITTED" },
  { label: "Under Review", value: "UNDER_REVIEW" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Rejected", value: "REJECTED" },
];

const SEManuscriptTab: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { manuscripts, meta, isFetching, availableManuscripts, refetch } =
    useFetchSEManuscripts({ page, limit: 10, search, status });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  return (
    <Box>
      {/* Search + Status Filters */}
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
          {STATUS_FILTERS.map((f) => (
            <Chip
              key={f.value}
              label={f.label}
              clickable
              color={status === f.value ? "primary" : "default"}
              variant={status === f.value ? "filled" : "outlined"}
              onClick={() => handleStatusChange(f.value)}
              size="small"
            />
          ))}
        </Stack>
      </Stack>

      <ManuscriptsDisplay
        manuscripts={manuscripts}
        isFetching={isFetching}
        availableManuscripts={availableManuscripts}
        refetch={refetch}
      />

      {/* Pagination */}
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
            onChange={(_e, value) => setPage(value)}
            color="primary"
            size="small"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
};

export default SEManuscriptTab;
