"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { getSection } from "@/app/api/sections";
import { createUser } from "@/app/api/users";
import useNotification from "@/hooks/useNotification";
import { getRoles } from "@/app/api/role";

type FormValues = {
  title: string;
  firstName: string;
  lastName: string;
  affiliation: string;
  phoneNumber: string;
  email: string;
  password: string;
  roleName: string;
  sectionId?: string;
};

interface Role {
  id: string;
  roleName: string;
  description: string;
}

const RegisterUserForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  const [roles, setRoles] = useState<Role[]>([]);
  const [sections, setSections] = useState<{ id: string; name: string }[]>([]);
  const { notify } = useNotification();
  const selectedRole = watch("roleName");
  const normalizedRole = selectedRole?.toLowerCase();
  const isReviewer = normalizedRole === "reviewer";
  const requiresSectionSelection =
    isReviewer || normalizedRole === "section-editor";
  const titleOptions = ["Mr", "Mrs", "Prof", "Dr", "Miss"];
  const [showPassword, setShowPassword] = useState(false);

  const [step, setStep] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesData = await getRoles();
        setRoles(Array.isArray(rolesData) ? rolesData : []);

        const sectionData = await getSection();
        setSections(Array.isArray(sectionData) ? sectionData : []);
      } catch (error) {
        console.error("Error fetching roles or sections:", error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await createUser(data);
      if (response.statusCode) {
        notify(`${response.message}! Failed to create User!`, {
          mode: "error",
        });
      } else {
        notify("User successfully created", { mode: "success" });
        reset();
        setStep(1);
      }
    } catch (error) {
      notify("Failed to create User!", { mode: "error" });
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{ p: 4, mt: 8, borderRadius: 3, maxWidth: 800, mx: "auto" }}
    >
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Register New User
      </Typography>

      {step === 1 && (
        <>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Step 1: Select a role for the new user.
          </Typography>

          <ToggleButtonGroup
            exclusive
            value={selectedRole}
            onChange={(_, value) => {
              if (value) {
                setValue("roleName", value);
                setStep(2);
              }
            }}
            fullWidth
            sx={{
              flexWrap: "wrap",
              gap: 1,
              mb: 2,
              "& .MuiToggleButtonGroup-grouped": {
                margin: 0,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "8px !important",
              },
            }}
          >
            {roles.map((role) => (
              <ToggleButton
                key={role.id}
                value={role.roleName}
                sx={{
                  textTransform: "none",
                  flex: "1 1 45%",
                  minHeight: 60,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1" fontWeight={600}>
                  {role.roleName.replace(/-/g, " ")}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  textAlign="center"
                >
                  {role.description}
                </Typography>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </>
      )}

      {step === 2 && (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {/* Role Header */}
          <Box
            sx={{
              mb: 3,
              p: 2,
              bgcolor: "grey.100",
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="subtitle1" fontSize={16} fontWeight={600}>
              Role: {selectedRole?.replace(/-/g, " ")}
            </Typography>
            <Button size="small" onClick={() => setStep(1)}>
              Change Role
            </Button>
          </Box>

          <Stack spacing={2}>
            {/* Section Dropdown */}
            {requiresSectionSelection && (
              <Controller
                name="sectionId"
                control={control}
                rules={{ required: "Section is required" }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Section"
                    fullWidth
                    error={!!errors.sectionId}
                    helperText={errors.sectionId?.message}
                  >
                    {sections.map((section) => (
                      <MenuItem key={section.id} value={section.id}>
                        {section.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            )}

            {/* Title */}
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Title"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                >
                  {titleOptions.map((title) => (
                    <MenuItem key={title} value={title}>
                      {title}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            {/* First Name */}
            <Controller
              name="firstName"
              control={control}
              rules={{ required: "First name is required" }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />

            {/* Last Name */}
            <Controller
              name="lastName"
              control={control}
              rules={{ required: "Last name is required" }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />

            {/* Affiliation */}
            <Controller
              name="affiliation"
              control={control}
              rules={{ required: "Affiliation is required" }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Affiliation"
                  fullWidth
                  error={!!errors.affiliation}
                  helperText={errors.affiliation?.message}
                />
              )}
            />

            {/* Phone Number */}
            <Controller
              name="phoneNumber"
              control={control}
              rules={{ required: "Phone number is required" }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone Number"
                  fullWidth
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                />
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Stack>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 3, py: 1.2, borderRadius: 2 }}
          >
            Register
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default RegisterUserForm;
