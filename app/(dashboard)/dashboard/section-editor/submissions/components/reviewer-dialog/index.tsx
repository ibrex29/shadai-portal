"use client";

import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Modal,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { ManuscriptProps, ManuscriptSuggestedReviewer } from "@/types";
import { getInitials } from "@/utils";
import { getChiefEditorReviewers, getSEReviewers } from "@/app/api/manuscript";
import {  FetchSEReviewersResponse } from "@/app/api/manuscript/types";

interface AssignSuggestedPayload {
  suggestedReviewerId: string;
  sectionId: string;
  reviewDueDate: string;
}

interface ReviewerModalProps {
  manuscript: ManuscriptProps;
  open: boolean;
  onClose: () => void;
  reviewerScope?: "section" | "all";
  onAssign: (
    reviewerId: string,
    manuscriptId: string,
    reviewDueDate: string,
  ) => void;
  onAssignSuggested?: (payload: AssignSuggestedPayload) => void;
  onUnassign?: (reviewerId: string, manuscriptId: string) => void;
}

export default function ReviewerModal({
  manuscript,
  open,
  onClose,
  reviewerScope = "section",
  onAssign,
  onAssignSuggested,
  onUnassign,
}: ReviewerModalProps) {
  const [dueDates, setDueDates] = useState<{ [key: string]: Dayjs | null }>({});
  const [dateErrors, setDateErrors] = useState<{ [key: string]: boolean }>({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Form state for "Add & Assign Suggested Reviewer" dialog
  const [formOpen, setFormOpen] = useState(false);
  const [activeSuggested, setActiveSuggested] =
    useState<ManuscriptSuggestedReviewer | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    affiliation: "",
  });
  const [formDueDate, setFormDueDate] = useState<Dayjs | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Build sets once per render for O(1) lookup
  const assignedReviewerIds = new Set(
    (manuscript.Reviewers ?? []).map((r) => r.reviewerId),
  );
  const assignedEmails = new Set(
    (manuscript.Reviewers ?? [])
      .map((r) => r.reviewer?.User?.email?.toLowerCase())
      .filter(Boolean) as string[],
  );

  const handleUnassign = (reviewerProfileId: string) => {
    if (onUnassign) onUnassign(reviewerProfileId, manuscript.id);
  };

  const openSuggestedForm = (sr: ManuscriptSuggestedReviewer) => {
    setActiveSuggested(sr);
    setFormData({
      name: sr.name ?? "",
      email: sr.email ?? "",
      phone: sr.phone ?? "",
      affiliation: sr.affiliation ?? "",
    });
    setFormDueDate(null);
    setFormErrors({});
    setFormOpen(true);
  };

  const closeSuggestedForm = () => {
    setFormOpen(false);
    setActiveSuggested(null);
  };

  const handleFormSubmit = () => {
    const errors: Record<string, string> = {};
    if (!formDueDate) errors.dueDate = "Review due date is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const payload: AssignSuggestedPayload = {
      suggestedReviewerId: activeSuggested!.id,
      sectionId: manuscript.sectionId,
      reviewDueDate: formDueDate!.toISOString(),
    };

    if (onAssignSuggested) {
      onAssignSuggested(payload);
    }

    closeSuggestedForm();
    onClose();
  };

  // Fetch roles to get reviewer role ID
  // Fetch section-scoped reviewers with pagination
  const {
    data: reviewers,
    isLoading,
    isError,
    refetch,
  } = useQuery<FetchSEReviewersResponse>({
    queryKey: ["se-dialog-reviewers", reviewerScope, manuscript.sectionId, page, search],
    queryFn: () => {
      if (reviewerScope === "all") {
        return getChiefEditorReviewers({
          page,
          limit: 5,
          search,
        });
      }

      return getSEReviewers({
        page,
        limit: 5,
        search,
        sectionId: manuscript.sectionId || undefined,
      });
    },
    enabled: open,
  });

  const handleAssign = (reviewerId: string) => {
    const reviewDueDate = dueDates[reviewerId] ?? null;
    if (!reviewDueDate) {
      setDateErrors((prev) => ({ ...prev, [reviewerId]: true }));
      return;
    }
    onAssign(reviewerId, manuscript.id, reviewDueDate.toISOString());
    onClose();
  };

  const handleDateChange = (reviewerId: string, newDate: Dayjs | null) => {
    setDueDates((prev) => ({ ...prev, [reviewerId]: newDate }));
    if (newDate) {
      setDateErrors((prev) => ({ ...prev, [reviewerId]: false }));
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95vw", sm: 680 },
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 3,
            boxShadow: 6,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              px: 3,
              pt: 3,
              pb: 2,
              borderBottom: "1px solid",
              borderColor: "grey.200",
              flexShrink: 0,
            }}
          >
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>
                Assign Reviewer
              </Typography>
              <Tooltip title={manuscript.title}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    maxWidth: 520,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {manuscript.title}
                </Typography>
              </Tooltip>
            </Box>
            <IconButton onClick={onClose} aria-label="close" size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* ── Suggested Reviewers section ── */}
          {manuscript.SuggestedReviewers && manuscript.SuggestedReviewers.length > 0 && (
            <Box sx={{ px: 3, pt: 2, pb: 1, flexShrink: 0 }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
                <StarOutlineIcon sx={{ fontSize: 16, color: "warning.main" }} />
                <Typography variant="caption" fontWeight={700} color="warning.dark" textTransform="uppercase" letterSpacing={0.5}>
                  Suggested by Author
                </Typography>
                <Chip label={manuscript.SuggestedReviewers.length} size="small" color="warning" sx={{ height: 18, fontSize: "0.65rem" }} />
              </Stack>

              <Stack spacing={1.5}>
                {manuscript.SuggestedReviewers.map((sr) => {
                  const isSuggestedAssigned = assignedEmails.has(
                    (sr.email ?? "").toLowerCase(),
                  );
                  return (
                    <Paper
                      key={sr.id}
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        px: 2,
                        py: 1.5,
                        borderColor: "warning.200",
                        backgroundColor: "warning.50",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        flexWrap: "wrap",
                      }}
                    >
                      {/* Avatar */}
                      <Avatar
                        sx={{
                          bgcolor: "warning.main",
                          width: 40,
                          height: 40,
                          fontSize: "0.85rem",
                          flexShrink: 0,
                          color: "white",
                        }}
                      >
                        {getInitials((sr.name ?? "").toUpperCase())}
                      </Avatar>

                      {/* Info */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={700} noWrap>
                          {sr.name}
                        </Typography>
                        <Stack direction="row" flexWrap="wrap" gap={1} mt={0.4}>
                          {sr.email && (
                            <Stack direction="row" alignItems="center" spacing={0.4}>
                              <EmailOutlinedIcon sx={{ fontSize: 12, color: "text.secondary" }} />
                              <Typography variant="caption" color="text.secondary">{sr.email}</Typography>
                            </Stack>
                          )}
                          {sr.phone && (
                            <Stack direction="row" alignItems="center" spacing={0.4}>
                              <PhoneOutlinedIcon sx={{ fontSize: 12, color: "text.secondary" }} />
                              <Typography variant="caption" color="text.secondary">{sr.phone}</Typography>
                            </Stack>
                          )}
                          {sr.affiliation && (
                            <Stack direction="row" alignItems="center" spacing={0.4}>
                              <SchoolOutlinedIcon sx={{ fontSize: 12, color: "text.secondary" }} />
                              <Typography variant="caption" color="text.secondary">{sr.affiliation}</Typography>
                            </Stack>
                          )}
                        </Stack>
                      </Box>

                      {/* Assign button */}
                      {isSuggestedAssigned ? (
                        <Chip
                          icon={<CheckCircleOutlineIcon sx={{ fontSize: "14px !important" }} />}
                          label="Assigned"
                          size="small"
                          color="success"
                          variant="outlined"
                          sx={{ borderRadius: "20px", fontSize: "0.72rem", px: 0.5, flexShrink: 0 }}
                        />
                      ) : (
                        <Button
                          variant="contained"
                          color="warning"
                          size="small"
                          onClick={() => openSuggestedForm(sr)}
                          sx={{
                            borderRadius: "20px",
                            textTransform: "none",
                            fontSize: "0.72rem",
                            whiteSpace: "nowrap",
                            px: 2,
                            py: "6px",
                            flexShrink: 0,
                            color: "white",
                          }}
                        >
                          Add &amp; Assign
                        </Button>
                      )}
                    </Paper>
                  );
                })}
              </Stack>

              <Divider sx={{ mt: 2 }} />
            </Box>
          )}

          {/* Search */}
          <Box sx={{ px: 3, py: 2, flexShrink: 0 }}>
            <TextField
              placeholder="Search by name or email..."
              value={search}
              onChange={handleSearchChange}
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Scrollable reviewer list */}
          <Box sx={{ flex: 1, overflowY: "auto", px: 3, pb: 2 }}>
            {isLoading ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Paper
                    key={i}
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      px: 2,
                      py: 1.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      borderColor: "grey.200",
                    }}
                  >
                    {/* Avatar shimmer */}
                    <Skeleton
                      variant="circular"
                      width={40}
                      height={40}
                      sx={{ flexShrink: 0 }}
                      animation="wave"
                    />
                    {/* Name + email shimmer */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Skeleton variant="text" width="45%" height={16} animation="wave" sx={{ mb: 0.5 }} />
                      <Skeleton variant="text" width="65%" height={13} animation="wave" />
                    </Box>
                    {/* Date + button shimmer */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
                      <Skeleton variant="rounded" width={148} height={36} animation="wave" sx={{ borderRadius: 1 }} />
                      <Skeleton variant="rounded" width={64} height={30} animation="wave" sx={{ borderRadius: "20px" }} />
                    </Box>
                  </Paper>
                ))}
              </Box>
            ) : isError ? (
              <Box textAlign="center" py={4}>
                <Typography color="error" gutterBottom>
                  Failed to load reviewers.
                </Typography>
                <Button size="small" onClick={() => refetch()}>
                  Retry
                </Button>
              </Box>
            ) : reviewers && reviewers.meta.itemCount > 0 ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {reviewers.data.map((reviewer) => {
                  const rid = reviewer.id;
                  const fullName =
                    [reviewer.user?.firstName, reviewer.user?.lastName]
                      .filter(Boolean)
                      .join(" ") || "N/A";
                  const hasError = !!dateErrors[rid];
                  const isAssigned = assignedReviewerIds.has(rid);

                  return (
                    <Paper
                      key={rid}
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        px: 2,
                        py: 1.5,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        borderColor: isAssigned
                          ? "success.300"
                          : hasError
                            ? "error.main"
                            : "grey.200",
                        backgroundColor: isAssigned ? "success.50" : "transparent",
                        transition: "border-color 0.2s",
                        "&:hover": { borderColor: isAssigned ? "success.main" : "primary.main" },
                      }}
                    >
                      {/* Avatar */}
                      <Avatar
                        sx={{
                          bgcolor: "primary.main",
                          width: 40,
                          height: 40,
                          fontSize: "0.85rem",
                          flexShrink: 0,
                        }}
                      >
                        {getInitials(fullName.toUpperCase())}
                      </Avatar>

                      {/* Name + email */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          noWrap
                        >
                          {fullName}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                          display="block"
                        >
                          {reviewer.user?.email}
                        </Typography>
                        {reviewer.expertiseArea && (
                          <Chip
                            label={reviewer.expertiseArea}
                            size="small"
                            variant="outlined"
                            icon={<PersonOutlineIcon sx={{ fontSize: "12px !important" }} />}
                            sx={{ mt: 0.5, fontSize: "0.65rem", height: 20 }}
                          />
                        )}
                      </Box>

                      {/* Date + Assign — right side, always aligned */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          flexShrink: 0,
                        }}
                      >
                        {isAssigned ? (
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleUnassign(rid)}
                            sx={{
                              borderRadius: "20px",
                              textTransform: "none",
                              fontSize: "0.75rem",
                              whiteSpace: "nowrap",
                              px: 2,
                              py: "6px",
                            }}
                          >
                            Unassign
                          </Button>
                        ) : (
                          <>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                              <DatePicker
                                label="Due Date *"
                                value={dueDates[rid] ?? null}
                                minDate={dayjs().add(1, "day")}
                                onChange={(date) => handleDateChange(rid, date)}
                                slotProps={{
                                  textField: {
                                    size: "small",
                                    error: hasError,
                                    helperText: hasError ? "Required" : undefined,
                                    FormHelperTextProps: {
                                      sx: { fontSize: "0.65rem", mx: 0, mt: 0.3 },
                                    },
                                    sx: {
                                      width: 148,
                                      "& .MuiInputBase-input": {
                                        fontSize: "0.75rem",
                                        py: "6px",
                                        px: "8px",
                                      },
                                      "& .MuiInputLabel-root": {
                                        fontSize: "0.75rem",
                                      },
                                      "& .MuiInputLabel-shrink": {
                                        fontSize: "0.7rem",
                                      },
                                      "& .MuiIconButton-root": {
                                        padding: "4px",
                                        "& svg": { fontSize: "1rem" },
                                      },
                                    },
                                  },
                                }}
                              />
                            </Box>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleAssign(rid)}
                              sx={{
                                borderRadius: "20px",
                                textTransform: "none",
                                fontSize: "0.75rem",
                                whiteSpace: "nowrap",
                                px: 2,
                                py: "6px",
                                alignSelf: "flex-start",
                              }}
                            >
                              Assign
                            </Button>
                          </>
                        )}
                      </Box>
                    </Paper>
                  );
                })}
              </Box>
            ) : (
              <Typography textAlign="center" color="text.secondary" py={4}>
                No reviewers found.
              </Typography>
            )}
          </Box>

          {/* Footer pagination */}
          {reviewers && reviewers.meta.pageCount > 1 && (
            <>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 3,
                  py: 1.5,
                  flexShrink: 0,
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {reviewers.meta.itemCount} reviewer
                  {reviewers.meta.itemCount !== 1 ? "s" : ""} found
                </Typography>
                <Pagination
                  count={reviewers.meta.pageCount}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="small"
                  shape="rounded"
                />
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* ── Add & Assign Suggested Reviewer form dialog ── */}
      <Dialog
        open={formOpen}
        onClose={closeSuggestedForm}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>
                Add &amp; Assign Reviewer
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Review the suggested reviewer&apos;s details, edit if needed, then assign.
              </Typography>
            </Box>
            <IconButton size="small" onClick={closeSuggestedForm}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            {/* Read-only reviewer info */}
            <TextField
              label="Full Name"
              value={formData.name}
              size="small"
              fullWidth
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiInputBase-input": { color: "text.secondary" } }}
            />

            <TextField
              label="Email Address"
              value={formData.email}
              size="small"
              fullWidth
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiInputBase-input": { color: "text.secondary" } }}
            />

            {formData.phone && (
              <TextField
                label="Phone Number"
                value={formData.phone}
                size="small"
                fullWidth
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneOutlinedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiInputBase-input": { color: "text.secondary" } }}
              />
            )}

            {formData.affiliation && (
              <TextField
                label="Affiliation / Institution"
                value={formData.affiliation}
                size="small"
                fullWidth
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolOutlinedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiInputBase-input": { color: "text.secondary" } }}
              />
            )}

            {/* Review Due Date — only editable field */}
            <DatePicker
              label="Review Due Date *"
              value={formDueDate}
              minDate={dayjs().add(1, "day")}
              onChange={(date) => {
                setFormDueDate(date);
                if (date) setFormErrors((prev) => ({ ...prev, dueDate: "" }));
              }}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  error: !!formErrors.dueDate,
                  helperText: formErrors.dueDate,
                },
              }}
            />
          </Stack>
        </DialogContent>

        <Divider />

        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={closeSuggestedForm}
            sx={{ borderRadius: "20px", textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={handleFormSubmit}
            sx={{ borderRadius: "20px", textTransform: "none", color: "white" }}
          >
            Add &amp; Assign Reviewer
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
