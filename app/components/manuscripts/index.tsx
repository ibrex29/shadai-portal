/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Stack,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import ManuscriptCard from "../manuscript-card";
import { Volume, Issue, Manuscript } from "@/types";
import ManuscriptCardSkeleton from "../manuscript-card/loader";
import VolumeDropdownSkeleton from "../loader/volume";
import NoManuscriptPlaceholder from "./empty-catalogue";
import { getPublishedManuscript } from "@/app/api/(landing-page)/manuscript";
import { getVolume } from "@/app/api/(landing-page)/volume";
import useNotification from "@/hooks/useNotification";

const VolumeIssueSelectorInner: React.FC = () => {
  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { errors: formErrors },
  } = useFormContext();
  const [volumes, setVolumes] = useState<Volume[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [fetchError, setFetchError] = useState("");
  const [loadingVolumes, setLoadingVolumes] = useState(true);
  const { notify } = useNotification();

  const watchedVolumeId = watch("volume");
  const watchedIssueId = watch("issue");
  const watchedQuery = watch("query");
  const watchedPage = watch("page");

  // Fetch volumes
  useEffect(() => {
    const fetchVolumes = async () => {
      try {
        setLoadingVolumes(true);
        const response: Volume[] = await getVolume();
        setVolumes(response ?? []);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setFetchError(
          `Failed to fetch volumes: ${errorMessage}. Please try again.`,
        );
        notify(`Failed to fetch volumes: ${errorMessage}`, { mode: "error" });
      } finally {
        setLoadingVolumes(false);
      }
    };
    fetchVolumes();
  }, [notify]);

  // Update issues when volume changes
  useEffect(() => {
    if (!watchedVolumeId) {
      setIssues([]);
      setValue("issue", "");
      return;
    }

    const selectedVolume = volumes.find((v) => v.id === watchedVolumeId);
    if (selectedVolume) {
      setIssues(selectedVolume.issues ?? []);
      setValue("issue", selectedVolume.issues?.[0]?.id ?? "");
    } else {
      setIssues([]);
      setValue("issue", "");
    }
  }, [watchedVolumeId, volumes, setValue]);

  // Restore selections from localStorage on mount
  useEffect(() => {
    if (volumes.length > 0) {
      const storedVolumeId = localStorage.getItem("selectedVolumeId");
      const storedIssueId = localStorage.getItem("selectedIssueId");

      const volumeId =
        storedVolumeId && volumes.find((v) => v.id === storedVolumeId)
          ? storedVolumeId
          : volumes[0].id;
      setValue("volume", volumeId);

      const selectedVolume = volumes.find((v) => v.id === volumeId);
      if (selectedVolume && selectedVolume.issues?.length) {
        const issueId =
          storedIssueId &&
          selectedVolume.issues.find((i) => i.id === storedIssueId)
            ? storedIssueId
            : selectedVolume.issues[0].id;
        setValue("issue", issueId);
      }
    }
  }, [volumes, setValue]);

  // Save selections to localStorage
  useEffect(() => {
    if (watchedVolumeId) {
      localStorage.setItem("selectedVolumeId", watchedVolumeId);
    }
    if (watchedIssueId) {
      localStorage.setItem("selectedIssueId", watchedIssueId);
    }
  }, [watchedVolumeId, watchedIssueId]);

  // Fetch manuscripts
  const { data: manuscripts, isLoading: isLoadingManuscripts } = useQuery({
    queryKey: [
      "manuscripts",
      watchedVolumeId,
      watchedIssueId,
      watchedPage,
      watchedQuery,
    ],
    queryFn: async () =>
      getPublishedManuscript(
        undefined,
        watchedPage,
        10,
        watchedQuery,
        watchedIssueId,
        watchedVolumeId,
      ),
    enabled: !!watchedVolumeId && !!watchedIssueId,
  });

  if (loadingVolumes) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ m: 4, width: "90%" }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          {/* Volume Selector */}
          <Controller
            name="volume"
            control={control}
            render={({ field }) => (
              <FormControl sx={{ minWidth: 200 }} error={!!formErrors.volume}>
                <InputLabel>Volume</InputLabel>
                <Select {...field} label="Volume" disabled={loadingVolumes}>
                  {volumes.map((volume) => (
                    <MenuItem key={volume.id} value={volume.id}>
                      {volume.name}
                    </MenuItem>
                  ))}
                </Select>
                {formErrors.volume && (
                  <Typography variant="body2" color="error">
                    {(formErrors.volume.message as string) || ""}
                  </Typography>
                )}
              </FormControl>
            )}
          />

          {/* Issue Selector */}
          <Controller
            name="issue"
            control={control}
            render={({ field }) => (
              <FormControl sx={{ minWidth: 200 }} error={!!formErrors.issue}>
                <InputLabel>Issue</InputLabel>
                <Select
                  {...field}
                  label="Issue"
                  disabled={!watchedVolumeId || !issues.length}
                >
                  {issues.length ? (
                    issues.map((issue) => (
                      <MenuItem key={issue.id} value={issue.id}>
                        {issue.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      No issues available
                    </MenuItem>
                  )}
                </Select>
                {formErrors.issue && (
                  <Typography variant="body2" color="error">
                    {(formErrors.issue.message as string) || ""}
                  </Typography>
                )}
              </FormControl>
            )}
          />
        </Stack>

        {/* Search Input */}
        <Controller
          name="query"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Search"
              variant="outlined"
              sx={{ maxWidth: 400, width: "100%" }}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                ),
              }}
              error={!!formErrors.query}
              helperText={(formErrors.query?.message as string) || ""}
            />
          )}
        />
      </Stack>

      {/* Error Display */}
      {fetchError && (
        <Typography
          variant="body2"
          color="error"
          sx={{ mt: 2, textAlign: "center" }}
        >
          {fetchError}
        </Typography>
      )}

      {/* Manuscript List */}
      {watchedVolumeId && watchedIssueId && (
        <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
          {isLoadingManuscripts ? (
            [...Array(5)].map((_, index) => (
              <ManuscriptCardSkeleton key={index} />
            ))
          ) : manuscripts?.data?.length ? (
            manuscripts.data.map((manuscript: Manuscript) => (
              <ManuscriptCard key={manuscript.id} manuscript={manuscript} />
            ))
          ) : (
            <NoManuscriptPlaceholder />
          )}
        </Box>
      )}

      {/* Pagination Controls */}
      {manuscripts && manuscripts.meta && (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mt: 3 }}
        >
          <Button
            variant="outlined"
            onClick={() => setValue("page", Math.max(watchedPage - 1, 1))}
            disabled={!manuscripts.meta.hasPreviousPage}
          >
            Previous
          </Button>
          <Typography variant="body2" sx={{ py: 1 }}>
            Page {manuscripts.meta.page} of {manuscripts.meta.pageCount}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setValue("page", watchedPage + 1)}
            disabled={!manuscripts.meta.hasNextPage}
          >
            Next
          </Button>
        </Stack>
      )}
    </Box>
  );
};

const VolumeIssueSelector: React.FC = () => {
  const methods = useForm({
    defaultValues: {
      volume: "",
      issue: "",
      query: "",
      page: 1,
    },
  });

  return (
    <FormProvider {...methods}>
      <VolumeIssueSelectorInner />
    </FormProvider>
  );
};

export default VolumeIssueSelector;
