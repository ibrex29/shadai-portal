"use client";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { getVolume } from "@/app/api/(landing-page)/volume";
import { getPublications, updatePublication } from "@/app/api/publication";
import useNotification from "@/hooks/useNotification";
import { Manuscript, Meta, Volume } from "@/types";
import { SortOrder } from "@/types/enum";

const ROW_OPTIONS = [10, 20, 50];
const STATUS_FILTERS = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const PublicationsTable: React.FC = () => {
  const { notify } = useNotification();

  const [publications, setPublications] = useState<Manuscript[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Asc);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [volumeFilter, setVolumeFilter] = useState("");
  const [issueFilter, setIssueFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [volumes, setVolumes] = useState<Volume[]>([]);
  const [isFetchingVolumes, setIsFetchingVolumes] = useState(false);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState<Manuscript | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    if (!volumeFilter) return;
    const matchingVolume = volumes.find((volume) => volume.id === volumeFilter);
    const issueBelongsToVolume = matchingVolume?.issues?.some((issue) => issue.id === issueFilter);
    if (!issueBelongsToVolume) {
      setIssueFilter("");
    }
  }, [volumeFilter, issueFilter, volumes]);

  const availableIssues = useMemo(() => {
    if (volumeFilter) {
      return volumes.find((volume) => volume.id === volumeFilter)?.issues ?? [];
    }
    return volumes.flatMap((volume) => volume.issues ?? []);
  }, [volumeFilter, volumes]);

  const fetchVolumes = useCallback(async () => {
    try {
      setIsFetchingVolumes(true);
      const response = await getVolume();
      setVolumes(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("Failed to fetch volumes", err);
      notify("Unable to load volumes", { mode: "error" });
    } finally {
      setIsFetchingVolumes(false);
    }
  }, [notify]);

  const fetchPublications = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getPublications({
        page,
        limit,
        sortOrder,
        search: debouncedSearch || undefined,
        volumeId: volumeFilter || undefined,
        issueId: issueFilter || undefined,
        isActive:
          statusFilter === "all"
            ? undefined
            : statusFilter === "active"
              ? true
              : false,
      });
      setPublications(response.data);
      setMeta(response.meta);
    } catch (err) {
      console.error("Failed to fetch publications", err);
      setError("Unable to load publications");
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, sortOrder, debouncedSearch, volumeFilter, issueFilter, statusFilter]);

  useEffect(() => {
    fetchVolumes();
  }, [fetchVolumes]);

  useEffect(() => {
    fetchPublications();
  }, [fetchPublications]);

  const handleRefresh = () => {
    fetchPublications();
  };

  const handleClearFilters = () => {
    setSearch("");
    setVolumeFilter("");
    setIssueFilter("");
    setStatusFilter("all");
    setSortOrder(SortOrder.Asc);
    setPage(1);
  };

  const handleToggleActive = async (publication: Manuscript) => {
    setTogglingId(publication.id);
    try {
      await updatePublication(publication.id, {
        isActive: !publication.isActive,
      });
      setPublications((prev) =>
        prev.map((item) =>
          item.id === publication.id ? { ...item, isActive: !item.isActive } : item,
        ),
      );
      notify("Publication status updated", { mode: "success" });
    } catch (err) {
      console.error("Failed to toggle publication", err);
      notify("Unable to update publication", { mode: "error" });
    } finally {
      setTogglingId(null);
    }
  };

  const handleEdit = (publication: Manuscript) => {
    setSelectedPublication(publication);
    setEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setEditDialogOpen(false);
    setSelectedPublication(null);
  };

  const handleSavePublication = async (values: PublicationFormValues) => {
    if (!selectedPublication) return;
    setIsSaving(true);
    try {
      await updatePublication(selectedPublication.id, {
        title: values.title,
        abstract: values.abstract,
        keywords: values.keywords,
        doi: values.doi,
        pageRange: values.pageRange,
        formattedManuscript: values.formattedManuscript,
        issueId: values.issueId || undefined,
        isActive: values.isActive,
        authors: values.authors
          .split(",")
          .map((author) => author.trim())
          .filter(Boolean),
      });
      notify("Publication updated", { mode: "success" });
      handleCloseDialog();
      fetchPublications();
    } catch (err) {
      console.error("Failed to update publication", err);
      notify("Unable to update publication", { mode: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const renderFilters = () => (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      mb={3}
      alignItems={{ xs: "stretch", md: "center" }}
    >
      <TextField
        fullWidth
        placeholder="Search by title, DOI or author"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setPage(1);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
        size="small"
      />

      <FormControl sx={{ minWidth: 160 }} size="small" disabled={isFetchingVolumes}>
        <InputLabel id="volume-filter-label">Volume</InputLabel>
        <Select
          labelId="volume-filter-label"
          label="Volume"
          value={volumeFilter}
          onChange={(event) => {
            setVolumeFilter(event.target.value);
            setPage(1);
          }}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {volumes.map((volume) => (
            <MenuItem key={volume.id} value={volume.id}>
              {volume.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 160 }} size="small" disabled={isFetchingVolumes}>
        <InputLabel id="issue-filter-label">Issue</InputLabel>
        <Select
          labelId="issue-filter-label"
          label="Issue"
          value={issueFilter}
          onChange={(event) => {
            setIssueFilter(event.target.value);
            setPage(1);
          }}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {availableIssues.map((issue) => (
            <MenuItem key={issue.id} value={issue.id}>
              {issue.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        select
        label="Status"
        size="small"
        value={statusFilter}
        onChange={(event) => {
          setStatusFilter(event.target.value);
          setPage(1);
        }}
        sx={{ minWidth: 140 }}
      >
        {STATUS_FILTERS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Order"
        size="small"
        value={sortOrder}
        onChange={(event) => {
          setSortOrder(event.target.value as SortOrder);
          setPage(1);
        }}
        sx={{ minWidth: 140 }}
      >
        <MenuItem value={SortOrder.Asc}>Ascending</MenuItem>
        <MenuItem value={SortOrder.Des}>Descending</MenuItem>
      </TextField>

      <TextField
        select
        label="Rows"
        size="small"
        value={limit}
        onChange={(event) => {
          setLimit(Number(event.target.value));
          setPage(1);
        }}
        sx={{ minWidth: 100 }}
      >
        {ROW_OPTIONS.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <Stack direction="row" spacing={1} alignItems="center">
        <Button variant="outlined" size="small" onClick={handleClearFilters}>
          Clear
        </Button>
        <IconButton onClick={handleRefresh}>
          <RefreshIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Stack>
  );

  return (
    <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h6" fontWeight={600}>
            Manage Publications
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Review, update, or toggle visibility of published manuscripts.
          </Typography>
        </Box>
      </Box>

      {renderFilters()}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "grey.50" }}>
              <TableCell>Title</TableCell>
              <TableCell>DOI</TableCell>
              <TableCell>Authors</TableCell>
              <TableCell>Volume / Issue</TableCell>
              <TableCell>Page Range</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} sx={{ py: 4 }}>
                  <Box display="flex" justifyContent="center">
                    <CircularProgress size={28} />
                  </Box>
                </TableCell>
              </TableRow>
            ) : publications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} sx={{ py: 5 }}>
                  <Typography align="center" color="text.secondary">
                    No publications found for the selected filters.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              publications.map((publication) => (
                <TableRow key={publication.id} hover>
                  <TableCell>
                    <Typography fontWeight={600}>{publication.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Updated {new Date(publication.updatedAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{publication.DOI || "—"}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {(publication.Authors || []).join(", ") || "—"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="body2">
                        {publication.issue?.volume?.name ?? "—"}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {publication.issue?.name ?? "—"}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{publication.pageRange || "—"}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip
                        label={publication.isActive ? "Active" : "Inactive"}
                        color={publication.isActive ? "success" : "default"}
                        size="small"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            size="small"
                            checked={publication.isActive}
                            onChange={() => handleToggleActive(publication)}
                            disabled={togglingId === publication.id}
                          />
                        }
                        label="Visible"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit publication">
                      <span>
                        <IconButton onClick={() => handleEdit(publication)}>
                          <EditOutlinedIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ xs: "column", md: "row" }}
        mt={2}
        gap={2}
      >
        <Typography variant="body2" color="text.secondary">
          {meta
            ? `Showing ${(meta.page - 1) * meta.limit + 1} - ${Math.min(
                meta.page * meta.limit,
                meta.itemCount,
              )} of ${meta.itemCount}`
            : ""}
        </Typography>
        <Pagination
          count={meta?.pageCount || 1}
          page={page}
          color="primary"
          onChange={(_, value) => setPage(value)}
          showFirstButton
          showLastButton
        />
      </Box>

      <EditPublicationDialog
        open={editDialogOpen}
        onClose={handleCloseDialog}
        publication={selectedPublication}
        volumes={volumes}
        loading={isSaving}
        onSubmit={handleSavePublication}
      />
    </Paper>
  );
};

export default PublicationsTable;

type PublicationFormValues = {
  title: string;
  abstract: string;
  authors: string;
  keywords: string;
  doi: string;
  pageRange: string;
  formattedManuscript: string;
  issueId: string;
  isActive: boolean;
};

const EditPublicationDialog = ({
  open,
  publication,
  volumes,
  loading,
  onClose,
  onSubmit,
}: {
  open: boolean;
  publication: Manuscript | null;
  volumes: Volume[];
  loading: boolean;
  onClose: () => void;
  onSubmit: (values: PublicationFormValues) => void;
}) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm<PublicationFormValues>({
    defaultValues: {
      title: "",
      abstract: "",
      authors: "",
      keywords: "",
      doi: "",
      pageRange: "",
      formattedManuscript: "",
      issueId: "",
      isActive: true,
    },
  });

  const [selectedVolumeId, setSelectedVolumeId] = useState("");

  useEffect(() => {
    if (publication) {
      reset({
        title: publication.title ?? "",
        abstract: publication.abstract ?? "",
        authors: (publication.Authors || []).join(", "),
        keywords: publication.keywords ?? "",
        doi: publication.DOI ?? "",
        pageRange: publication.pageRange ?? "",
        formattedManuscript: publication.formattedManuscript ?? "",
        issueId: publication.issueId ?? "",
        isActive: publication.isActive,
      });

      const containingVolume = volumes.find((volume) =>
        volume.issues?.some((issue) => issue.id === publication.issueId),
      );
      setSelectedVolumeId(containingVolume?.id ?? "");
    } else {
      reset();
      setSelectedVolumeId("");
    }
  }, [publication, volumes, reset]);

  const watchedIssueId = watch("issueId");

  useEffect(() => {
    if (!selectedVolumeId) return;
    const selectedVolume = volumes.find((volume) => volume.id === selectedVolumeId);
    if (selectedVolume && selectedVolume.issues?.length && !watchedIssueId) {
      setValue("issueId", selectedVolume.issues[0].id);
    }
  }, [selectedVolumeId, volumes, watchedIssueId, setValue]);

  const issueOptions = useMemo(() => {
    if (!selectedVolumeId) {
      return volumes.flatMap((volume) => volume.issues ?? []);
    }
    return volumes.find((volume) => volume.id === selectedVolumeId)?.issues ?? [];
  }, [selectedVolumeId, volumes]);

  const handleVolumeChange = (value: string) => {
    setSelectedVolumeId(value);
    setValue("issueId", "");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Publication</DialogTitle>
      <DialogContent dividers>
        <Box component="form" id="publication-form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} mt={1}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => <TextField {...field} label="Title" fullWidth />}
            />

            <Controller
              name="abstract"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Abstract" fullWidth multiline minRows={4} />
              )}
            />

            <Controller
              name="authors"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Authors (comma separated)"
                  fullWidth
                  placeholder="Jane Doe, John Smith"
                />
              )}
            />

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <Controller
                name="keywords"
                control={control}
                render={({ field }) => <TextField {...field} label="Keywords" fullWidth />}
              />
              <Controller
                name="doi"
                control={control}
                render={({ field }) => <TextField {...field} label="DOI" fullWidth />}
              />
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel id="volume-select-label">Volume</InputLabel>
                <Select
                  labelId="volume-select-label"
                  label="Volume"
                  value={selectedVolumeId}
                  onChange={(event) => handleVolumeChange(event.target.value)}
                >
                  <MenuItem value="">
                    <em>Any</em>
                  </MenuItem>
                  {volumes.map((volume) => (
                    <MenuItem key={volume.id} value={volume.id}>
                      {volume.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Controller
                name="issueId"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="issue-select-label">Issue</InputLabel>
                    <Select
                      {...field}
                      labelId="issue-select-label"
                      label="Issue"
                      value={field.value || ""}
                    >
                      <MenuItem value="">
                        <em>Any</em>
                      </MenuItem>
                      {issueOptions.map((issue) => (
                        <MenuItem key={issue.id} value={issue.id}>
                          {issue.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Stack>

            <Controller
              name="pageRange"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Page Range" placeholder="pp. 1-10" fullWidth />
              )}
            />

            <Controller
              name="formattedManuscript"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Manuscript URL"
                  placeholder="https://..."
                  fullWidth
                />
              )}
            />

            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Switch {...field} checked={field.value} />}
                  label="Visible on landing pages"
                />
              )}
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="publication-form"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export type { PublicationFormValues };
