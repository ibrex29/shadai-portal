/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, MouseEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { createAuthor } from "@/app/api/users";
import { expertiseAreas } from "@/constants/constant";

interface SignupData {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  affiliation: string;
  expertiseArea: string;
}

const fieldRadius = { "& .MuiOutlinedInput-root": { borderRadius: 2 } };

const SignupForm: FC = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const rtlInputProps = { className: "rtl:text-right rtl:placeholder:text-right" };

  const { control, handleSubmit } = useForm<SignupData>({
    defaultValues: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      affiliation: "",
      expertiseArea: "",
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const signup = async (data: SignupData) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await createAuthor(data);

      if (response.id && response.userId) {
        router.push("/signin");
      } else if (
        response.statusCode === 409 &&
        response.message.includes("Email address already exists")
      ) {
        setErrorMessage("This email address is already registered.");
      } else if (
        response.statusCode === 400 &&
        response.message[0].includes("Password too weak")
      ) {
        setErrorMessage(
          "Password is too weak. Use at least one uppercase letter, one lowercase letter, and one number.",
        );
      } else {
        setErrorMessage("Sign-up failed. Please check your details and try again.");
      }
    } catch (error) {
      setErrorMessage("A network error occurred. Please try again.");
      console.error("Error during sign-up:", error);
    }

    setIsLoading(false);
  };

  return (
    <Box>
      {/* Heading */}
      <Stack spacing={0.5} mb={3}>
        <Typography variant="h5" fontWeight={800} color="text.primary">
          Create your account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Join the SHADAI community and start submitting your research.
        </Typography>
      </Stack>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit(signup)} noValidate>
        <Grid container spacing={2}>

          {/* Title (full width) */}
          <Grid item xs={12}>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field, fieldState }) => (
                <FormControl
                  fullWidth
                  error={!!fieldState.error}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                >
                  <InputLabel>Title *</InputLabel>
                  <Select {...field} label="Title *">
                    <MenuItem value="Mr">Mr</MenuItem>
                    <MenuItem value="Mrs">Mrs</MenuItem>
                    <MenuItem value="Ms">Ms</MenuItem>
                    <MenuItem value="Dr">Dr</MenuItem>
                    <MenuItem value="Prof">Prof</MenuItem>
                  </Select>
                  {fieldState.error && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.4, ml: 1.5 }}>
                      {fieldState.error.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Grid>

          {/* First name */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: "First name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="First Name *"
                  inputProps={rtlInputProps}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeOutlinedIcon sx={{ fontSize: 20, color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={fieldRadius}
                />
              )}
            />
          </Grid>

          {/* Last name */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: "Last name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Last Name *"
                  inputProps={rtlInputProps}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={fieldRadius}
                />
              )}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email Address *"
                  type="email"
                  autoComplete="email"
                  inputProps={rtlInputProps}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon sx={{ fontSize: 20, color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={fieldRadius}
                />
              )}
            />
          </Grid>

          {/* Password */}
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Password *"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  inputProps={rtlInputProps}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ fontSize: 20, color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={fieldRadius}
                />
              )}
            />
          </Grid>

          {/* Affiliation */}
          <Grid item xs={12}>
            <Controller
              name="affiliation"
              control={control}
              rules={{ required: "Affiliation is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Affiliation / Institution *"
                  inputProps={rtlInputProps}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessOutlinedIcon sx={{ fontSize: 20, color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={fieldRadius}
                />
              )}
            />
          </Grid>

          {/* Expertise Area */}
          <Grid item xs={12}>
            <Controller
              name="expertiseArea"
              control={control}
              rules={{ required: "Expertise area is required" }}
              render={({ field, fieldState }) => (
                <FormControl
                  fullWidth
                  error={!!fieldState.error}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                >
                  <InputLabel>Expertise Area *</InputLabel>
                  <Select
                    {...field}
                    label="Expertise Area *"
                    startAdornment={
                      <InputAdornment position="start">
                        <ScienceOutlinedIcon sx={{ fontSize: 20, color: "text.secondary", ml: 0.5 }} />
                      </InputAdornment>
                    }
                  >
                    {expertiseAreas.map((area) => (
                      <MenuItem key={area} value={area}>
                        {area}
                      </MenuItem>
                    ))}
                  </Select>
                  {fieldState.error && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.4, ml: 1.5 }}>
                      {fieldState.error.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Grid>

          {/* Submit */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              size="large"
              sx={{
                borderRadius: 2,
                py: 1.4,
                fontWeight: 700,
                fontSize: "0.95rem",
                textTransform: "none",
                boxShadow: "none",
                mt: 0.5,
                "&:hover": { boxShadow: "none", opacity: 0.92 },
              }}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </Grid>

          {/* Sign in link */}
          <Grid item xs={12}>
            <Divider sx={{ mb: 1.5 }}>
              <Typography variant="caption" color="text.disabled">
                OR
              </Typography>
            </Divider>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Already have an account?{" "}
              <Link href="/signin" style={{ textDecoration: "none" }}>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "primary.main", fontWeight: 700, "&:hover": { textDecoration: "underline" } }}
                >
                  Sign in here
                </Typography>
              </Link>
            </Typography>
          </Grid>

        </Grid>
      </form>
    </Box>
  );
};

export default SignupForm;
