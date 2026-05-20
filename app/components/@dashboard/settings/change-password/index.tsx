"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getSession } from "next-auth/react";
import { MouseEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import useNotification from "@/hooks/useNotification";
import { Auth } from "@/constants/config";

type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const fieldRadius = { "& .MuiOutlinedInput-root": { borderRadius: 2 } };

export default function ChangePasswordForm() {
  const { notify } = useNotification();

  const [isLoading, setIsLoading] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
  });

  const newPasswordValue = watch("newPassword");

  const preventMouseDown = (e: MouseEvent<HTMLButtonElement>) =>
    e.preventDefault();

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const session = await getSession();

      const response = await fetch(Auth.changePassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(session?.token
            ? { Authorization: `Bearer ${session.token}` }
            : {}),
        },
        body: JSON.stringify({
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        }),
      });

      if (response.status === 201 || response.ok) {
        notify("Password changed successfully!", { mode: "success" });
        reset();
      } else if (response.status === 400) {
        setApiError("Current password is incorrect. Please try again.");
      } else {
        setApiError("Something went wrong. Please try again later.");
      }
    } catch {
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 520 }}>
      <Stack spacing={0.5} mb={3}>
        <Typography variant="h6" fontWeight={700}>
          Change Password
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter your current password and choose a new one.
        </Typography>
      </Stack>

      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          {apiError && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
              {apiError}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2.5}>
              {/* Old Password */}
              <Controller
                name="oldPassword"
                control={control}
                rules={{ required: "Current password is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Current Password"
                    type={showOld ? "text" : "password"}
                    fullWidth
                    autoComplete="current-password"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon
                            sx={{ fontSize: 20, color: "text.secondary" }}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() => setShowOld((v) => !v)}
                            onMouseDown={preventMouseDown}
                            edge="end"
                            aria-label={
                              showOld
                                ? "Hide current password"
                                : "Show current password"
                            }
                          >
                            {showOld ? (
                              <VisibilityOff fontSize="small" />
                            ) : (
                              <Visibility fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={fieldRadius}
                  />
                )}
              />

              {/* New Password */}
              <Controller
                name="newPassword"
                control={control}
                rules={{
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  validate: (value) =>
                    value !== watch("oldPassword") ||
                    "New password must differ from the current password",
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="New Password"
                    type={showNew ? "text" : "password"}
                    fullWidth
                    autoComplete="new-password"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon
                            sx={{ fontSize: 20, color: "text.secondary" }}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() => setShowNew((v) => !v)}
                            onMouseDown={preventMouseDown}
                            edge="end"
                            aria-label={
                              showNew
                                ? "Hide new password"
                                : "Show new password"
                            }
                          >
                            {showNew ? (
                              <VisibilityOff fontSize="small" />
                            ) : (
                              <Visibility fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={fieldRadius}
                  />
                )}
              />

              {/* Confirm New Password */}
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Please confirm your new password",
                  validate: (value) =>
                    value === newPasswordValue || "Passwords do not match",
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Confirm New Password"
                    type={showConfirm ? "text" : "password"}
                    fullWidth
                    autoComplete="new-password"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon
                            sx={{ fontSize: 20, color: "text.secondary" }}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() => setShowConfirm((v) => !v)}
                            onMouseDown={preventMouseDown}
                            edge="end"
                            aria-label={
                              showConfirm
                                ? "Hide confirm password"
                                : "Show confirm password"
                            }
                          >
                            {showConfirm ? (
                              <VisibilityOff fontSize="small" />
                            ) : (
                              <Visibility fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={fieldRadius}
                  />
                )}
              />

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
                {isLoading ? "Updating password..." : "Update Password"}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
