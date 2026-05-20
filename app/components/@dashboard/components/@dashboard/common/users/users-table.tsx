"use client";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Avatar,
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
  Menu,
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
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { getSection } from "@/app/api/sections";
import { getRoles } from "@/app/api/role";
import {
  getUsers,
  PaginatedUsersResponse,
  type UpdateUserProfilePayload,
  type UpdateUserRoleOrSectionPayload,
  updateUserProfile,
  updateUserRoleOrSection,
  type User as DashboardUser,
} from "@/app/api/users";
import useNotification from "@/hooks/useNotification";
import { getInitials } from "@/utils";
import { fDate } from "@/utils/format-time";
import { getSession } from "next-auth/react";

const TITLE_OPTIONS = ["Mr", "Mrs", "Prof", "Dr", "Miss"];
const SORT_FIELDS = [
  { label: "Created", value: "createdAt" },
  { label: "First Name", value: "firstName" },
  { label: "Email", value: "email" },
];

interface RoleOption {
  id: string;
  roleName: string;
  description: string;
}

interface SectionOption {
  id: string;
  name: string;
}

type ProfileFormValues = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  affiliation: string;
  expertiseArea: string;
  higestQualification: string;
  reviewerExpertiseArea: string;
  reviewerHighestQualification: string;
  reviewInterest: boolean;
  password: string;
};

type RoleFormValues = {
  roleId: string;
  sectionId: string;
  replaceRoles: boolean;
};

type UsersTableProps = {
  title?: string;
  enableProfileUpdate?: boolean;
  enableRoleUpdate?: boolean;
  restrictToOwnSection?: boolean;
};

const UsersTable: React.FC<UsersTableProps> = ({
  title = "Manage Users",
  enableProfileUpdate = true,
  enableRoleUpdate = true,
  restrictToOwnSection = false,
}) => {
  const { notify } = useNotification();

  const [users, setUsers] = useState<DashboardUser[]>([]);
  const [meta, setMeta] = useState<PaginatedUsersResponse["meta"] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState("createdAt");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [lockedSectionId, setLockedSectionId] = useState<string | null>(null);
  const [sectionResolved, setSectionResolved] = useState(false);

  const [roles, setRoles] = useState<RoleOption[]>([]);
  const [sections, setSections] = useState<SectionOption[]>([]);

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<DashboardUser | null>(null);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [isProfileSubmitting, setIsProfileSubmitting] = useState(false);
  const [isRoleSubmitting, setIsRoleSubmitting] = useState(false);

  const sectionMap = useMemo(() => {
    const map = new Map<string, string>();
    sections.forEach((section) => map.set(section.id, section.name));
    return map;
  }, [sections]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchCollections = useCallback(async () => {
    try {
      const [rolesData, sectionsData] = await Promise.all([
        getRoles(),
        getSection(),
      ]);
      setRoles(Array.isArray(rolesData) ? rolesData : []);
      setSections(Array.isArray(sectionsData) ? sectionsData : []);
    } catch (err) {
      console.error("Failed to load role or section metadata", err);
    }
  }, []);

  const resolveOwnSection = useCallback(async () => {
    if (!restrictToOwnSection) {
      setSectionResolved(true);
      return;
    }

    try {
      const session = await getSession();
      const email = session?.user?.email?.toLowerCase();

      if (!email) {
        setLockedSectionId(null);
        return;
      }

      const response = await getUsers({
        page: 1,
        limit: 50,
        search: email,
      });

      const me = response.data.find((u) => u.email?.toLowerCase() === email);
      const currentSectionId = me?.Editor?.sectionId || me?.Reviewer?.sectionId || null;
      setLockedSectionId(currentSectionId);
    } catch (err) {
      console.error("Failed to resolve current section", err);
      setLockedSectionId(null);
    } finally {
      setSectionResolved(true);
    }
  }, [restrictToOwnSection]);

  const fetchUsers = useCallback(async () => {
    if (restrictToOwnSection && !sectionResolved) {
      return;
    }

    if (restrictToOwnSection && !lockedSectionId) {
      setUsers([]);
      setMeta(null);
      setError("No section is assigned to your account.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await getUsers({
        page,
        limit,
        sortOrder,
        sortField,
        search: debouncedSearch || undefined,
        roleId: roleFilter || undefined,
        sectionId: restrictToOwnSection
          ? lockedSectionId || undefined
          : sectionFilter || undefined,
      });
      setUsers(response.data);
      setMeta(response.meta);
    } catch (err) {
      console.error("Failed to fetch users", err);
      setError("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  }, [
    page,
    limit,
    sortOrder,
    sortField,
    debouncedSearch,
    roleFilter,
    sectionFilter,
    restrictToOwnSection,
    sectionResolved,
    lockedSectionId,
  ]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  useEffect(() => {
    resolveOwnSection();
  }, [resolveOwnSection]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRefresh = () => {
    fetchUsers();
  };

  const handleClearFilters = () => {
    setSearch("");
    setRoleFilter("");
    setSectionFilter("");
    setSortOrder("asc");
    setSortField("createdAt");
    setPage(1);
  };

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>, user: DashboardUser) => {
    setSelectedUser(user);
    setMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  const handleOpenProfileDialog = () => {
    setProfileDialogOpen(true);
    closeMenu();
  };

  const handleOpenRoleDialog = () => {
    setRoleDialogOpen(true);
    closeMenu();
  };

  const getDisplayName = (user: DashboardUser) => {
    const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
    return fullName || user.email;
  };

  const resolveSectionLabel = (user: DashboardUser) => {
    const sectionId = user.Editor?.sectionId || user.Reviewer?.sectionId;
    if (!sectionId) return "—";
    return sectionMap.get(sectionId) || sectionId;
  };

  const columnsCount = enableProfileUpdate || enableRoleUpdate ? 7 : 6;

  const handleProfileSubmit = async (values: ProfileFormValues) => {
    if (!selectedUser) return;
    setIsProfileSubmitting(true);
    const payload: UpdateUserProfilePayload = {
      ...values,
      title: values.title || null,
      affiliation: values.affiliation || null,
      expertiseArea: values.expertiseArea || null,
      phoneNumber: values.phoneNumber || null,
      higestQualification: values.higestQualification || null,
      reviewerExpertiseArea: values.reviewerExpertiseArea || null,
      reviewerHighestQualification: values.reviewerHighestQualification || null,
    };

    if (!values.password) {
      delete payload.password;
    }

    try {
      await updateUserProfile(selectedUser.id, payload);
      notify("User profile updated", { mode: "success" });
      setProfileDialogOpen(false);
      fetchUsers();
    } catch (err) {
      console.error("Failed to update profile", err);
      notify("Unable to update profile", { mode: "error" });
    } finally {
      setIsProfileSubmitting(false);
    }
  };

  const handleRoleSubmit = async (values: RoleFormValues) => {
    if (!selectedUser) return;
    setIsRoleSubmitting(true);
    const payload: UpdateUserRoleOrSectionPayload = {
      roleId: values.roleId || undefined,
      sectionId: values.sectionId || undefined,
      replaceRoles: values.replaceRoles,
    };

    try {
      await updateUserRoleOrSection(selectedUser.id, payload);
      notify("User role updated", { mode: "success" });
      setRoleDialogOpen(false);
      fetchUsers();
    } catch (err) {
      console.error("Failed to update user role", err);
      notify("Unable to update user role", { mode: "error" });
    } finally {
      setIsRoleSubmitting(false);
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
        placeholder="Search by name or email"
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

      <FormControl sx={{ minWidth: 160 }} size="small">
        <InputLabel id="role-filter-label">Role</InputLabel>
        <Select
          labelId="role-filter-label"
          label="Role"
          value={roleFilter}
          onChange={(event) => {
            setRoleFilter(event.target.value);
            setPage(1);
          }}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {roles.map((role) => (
            <MenuItem key={role.id} value={role.id}>
              {role.roleName.replace(/-/g, " ")}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {!restrictToOwnSection && (
        <FormControl sx={{ minWidth: 160 }} size="small">
          <InputLabel id="section-filter-label">Section</InputLabel>
          <Select
            labelId="section-filter-label"
            label="Section"
            value={sectionFilter}
            onChange={(event) => {
              setSectionFilter(event.target.value);
              setPage(1);
            }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {sections.map((section) => (
              <MenuItem key={section.id} value={section.id}>
                {section.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {restrictToOwnSection && (
        <Chip
          label={`Section: ${lockedSectionId ? sectionMap.get(lockedSectionId) || lockedSectionId : "Unassigned"}`}
          variant="outlined"
        />
      )}

      <TextField
        select
        label="Sort by"
        size="small"
        value={sortField}
        onChange={(event) => {
          setSortField(event.target.value);
          setPage(1);
        }}
        sx={{ minWidth: 160 }}
      >
        {SORT_FIELDS.map((field) => (
          <MenuItem key={field.value} value={field.value}>
            {field.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Order"
        size="small"
        value={sortOrder}
        onChange={(event) => {
          setSortOrder(event.target.value as "asc" | "desc");
          setPage(1);
        }}
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc">Descending</MenuItem>
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
        {[10, 20, 50].map((option) => (
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
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Search and manage existing platform users.
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
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              {(enableProfileUpdate || enableRoleUpdate) && <TableCell align="right">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columnsCount} sx={{ py: 4 }}>
                  <Box display="flex" justifyContent="center">
                    <CircularProgress size={28} />
                  </Box>
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columnsCount} sx={{ py: 5 }}>
                  <Typography align="center" color="text.secondary">
                    No users found for the selected filters.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
                        {getInitials(getDisplayName(user).toUpperCase())}
                      </Avatar>
                      <Box>
                        <Typography fontWeight={600}>{getDisplayName(user)}</Typography>
                        {user.title && (
                          <Typography variant="caption" color="text.secondary">
                            {user.title}
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{user.email}</Typography>
                    {user.phoneNumber && (
                      <Typography variant="caption" color="text.secondary">
                        {user.phoneNumber}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {user.roles.map((role) => (
                        <Chip
                          key={`${user.id}-${role.id}`}
                          label={role.roleName.replace(/-/g, " ")}
                          size="small"
                          color="default"
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>{resolveSectionLabel(user)}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.isActive ? "Active" : "Inactive"}
                      color={user.isActive ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{fDate(new Date(user.createdAt))}</TableCell>
                  {(enableProfileUpdate || enableRoleUpdate) && (
                    <TableCell align="right">
                      <IconButton onClick={(event) => openMenu(event, user)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  )}
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

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
        {enableProfileUpdate && <MenuItem onClick={handleOpenProfileDialog}>Edit Profile</MenuItem>}
        {enableRoleUpdate && <MenuItem onClick={handleOpenRoleDialog}>Update Role & Section</MenuItem>}
      </Menu>

      <ProfileDialog
        open={profileDialogOpen}
        user={selectedUser}
        onClose={() => setProfileDialogOpen(false)}
        onSubmit={handleProfileSubmit}
        loading={isProfileSubmitting}
      />

      <RoleDialog
        open={roleDialogOpen}
        user={selectedUser}
        roles={roles}
        sections={sections}
        onClose={() => setRoleDialogOpen(false)}
        onSubmit={handleRoleSubmit}
        loading={isRoleSubmitting}
      />
    </Paper>
  );
};

const ProfileDialog = ({
  open,
  user,
  loading,
  onClose,
  onSubmit,
}: {
  open: boolean;
  user: DashboardUser | null;
  loading: boolean;
  onClose: () => void;
  onSubmit: (values: ProfileFormValues) => void;
}) => {
  const { control, handleSubmit, reset } = useForm<ProfileFormValues>({
    defaultValues: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      affiliation: "",
      expertiseArea: "",
      higestQualification: "",
      reviewerExpertiseArea: "",
      reviewerHighestQualification: "",
      reviewInterest: false,
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        title: user.title ?? "",
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        phoneNumber: user.phoneNumber ?? "",
        affiliation: user.Author?.affiliation ?? "",
        expertiseArea:
          user.Author?.expertiseArea ?? user.Reviewer?.expertiseArea ?? "",
        higestQualification:
          user.Author?.higestQualification ??
          user.Reviewer?.higestQualification ??
          "",
        reviewerExpertiseArea: user.Reviewer?.expertiseArea ?? "",
        reviewerHighestQualification: user.Reviewer?.higestQualification ?? "",
        reviewInterest: user.Author?.reviewInterest ?? false,
        password: "",
      });
    }
  }, [user, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Update Profile</DialogTitle>
      <DialogContent dividers>
        <Box component="form" id="profile-form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} mt={1}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField {...field} select label="Title" fullWidth>
                  {TITLE_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="First Name" fullWidth />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Last Name" fullWidth />
                )}
              />
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Phone Number" fullWidth />
                )}
              />
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <Controller
                name="affiliation"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Affiliation" fullWidth />
                )}
              />
              <Controller
                name="expertiseArea"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Expertise Area" fullWidth />
                )}
              />
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <Controller
                name="higestQualification"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Highest Qualification" fullWidth />
                )}
              />
              <Controller
                name="reviewInterest"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Switch {...field} checked={field.value} />}
                    label="Interested in reviewing?"
                  />
                )}
              />
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <Controller
                name="reviewerExpertiseArea"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Reviewer Expertise Area" fullWidth />
                )}
              />
              <Controller
                name="reviewerHighestQualification"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Reviewer Highest Qualification"
                    fullWidth
                  />
                )}
              />
            </Stack>

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Temporary Password"
                  type="password"
                  fullWidth
                  helperText="Optional: set to issue a new temporary password"
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
          form="profile-form"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const RoleDialog = ({
  open,
  user,
  roles,
  sections,
  loading,
  onClose,
  onSubmit,
}: {
  open: boolean;
  user: DashboardUser | null;
  roles: RoleOption[];
  sections: SectionOption[];
  loading: boolean;
  onClose: () => void;
  onSubmit: (values: RoleFormValues) => void;
}) => {
  const { control, handleSubmit, reset, watch } = useForm<RoleFormValues>({
    defaultValues: {
      roleId: "",
      sectionId: "",
      replaceRoles: true,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        roleId: user.roles[0]?.id ?? "",
        sectionId: user.Editor?.sectionId || user.Reviewer?.sectionId || "",
        replaceRoles: true,
      });
    }
  }, [user, reset]);

  const selectedRoleId = watch("roleId");
  const selectedRoleName = roles.find((role) => role.id === selectedRoleId)?.roleName ?? "";
  const needsSection = /reviewer|section-editor/i.test(selectedRoleName);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Role & Section</DialogTitle>
      <DialogContent dividers>
        <Box component="form" id="role-form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} mt={1}>
            <Controller
              name="roleId"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field, fieldState }) => (
                <FormControl fullWidth size="small">
                  <InputLabel id="role-select-label">Role</InputLabel>
                  <Select
                    {...field}
                    labelId="role-select-label"
                    label="Role"
                    error={!!fieldState.error}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.roleName.replace(/-/g, " ")}
                      </MenuItem>
                    ))}
                  </Select>
                  {fieldState.error && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                      {fieldState.error.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="sectionId"
              control={control}
              rules={{
                validate: (value) => {
                  if (needsSection && !value) {
                    return "Section is required for this role";
                  }
                  return true;
                },
              }}
              render={({ field, fieldState }) => (
                <FormControl fullWidth size="small">
                  <InputLabel id="section-select-label">Section</InputLabel>
                  <Select
                    {...field}
                    labelId="section-select-label"
                    label="Section"
                    error={!!fieldState.error}
                  >
                    <MenuItem value="">
                      <em>Unassigned</em>
                    </MenuItem>
                    {sections.map((section) => (
                      <MenuItem key={section.id} value={section.id}>
                        {section.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {fieldState.error && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                      {fieldState.error.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="replaceRoles"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Switch {...field} checked={field.value} />}
                  label="Replace existing roles"
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
          form="role-form"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Updating..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UsersTable;
