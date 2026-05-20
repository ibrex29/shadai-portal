"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { FC, MouseEvent, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Auth } from "@/constants/config";

type ResetPasswordFormValues = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPasswordForm: FC = () => {
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

  const [isValidatingToken, setIsValidatingToken] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const rtlInputProps = { className: "rtl:text-right rtl:placeholder:text-right" };

  const { control, handleSubmit, watch, reset } = useForm<ResetPasswordFormValues>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsTokenValid(false);
        setErrorMessage("Reset token is missing. Please use the reset link from your email.");
        setIsValidatingToken(false);
        return;
      }

      setIsValidatingToken(true);
      setErrorMessage(null);

      try {
        const response = await fetch(Auth.validateResetPasswordToken, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const result = await response.json().catch(() => ({}));

        if (response.ok) {
          setIsTokenValid(true);
          return;
        }

        setIsTokenValid(false);
        setErrorMessage(result?.message || "Reset link is invalid or has expired.");
      } catch (error) {
        setIsTokenValid(false);
        setErrorMessage("Network error while validating reset token.");
        console.error("Failed to validate reset token:", error);
      } finally {
        setIsValidatingToken(false);
      }
    };

    validateToken();
  }, [token]);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(Auth.resetPassword, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword: data.newPassword,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setSuccessMessage(result?.message || "Password reset successful. You can now sign in.");
        reset();
        return;
      }

      setErrorMessage(result?.message || "Failed to reset password. Please request a new link.");
    } catch (error) {
      setErrorMessage("Network error. Please check your connection and try again.");
      console.error("Failed to reset password:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isValidatingToken) {
    return (
      <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ py: 8 }}>
        <CircularProgress size={28} />
        <Typography variant="body2" color="text.secondary">
          Validating reset link...
        </Typography>
      </Stack>
    );
  }

  return (
    <Box>
      <Stack spacing={0.5} mb={4}>
        <Typography variant="h5" fontWeight={800} color="text.primary">
          Reset Password
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter your new password to complete your account recovery.
        </Typography>
      </Stack>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {!isTokenValid ? (
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Go back to{" "}
          <Link href="/forgot-password" style={{ textDecoration: "none" }}>
            <Typography
              component="span"
              variant="body2"
              sx={{ color: "primary.main", fontWeight: 700, "&:hover": { textDecoration: "underline" } }}
            >
              Forgot Password
            </Typography>
          </Link>
        </Typography>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2.5}>
            <Controller
              name="newPassword"
              control={control}
              rules={{
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="New Password"
                  type={showNewPassword ? "text" : "password"}
                  fullWidth
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
                          onClick={() => setShowNewPassword((show) => !show)}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          aria-label={showNewPassword ? "Hide password" : "Show password"}
                        >
                          {showNewPassword ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Please confirm your new password",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  fullWidth
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
                          onClick={() => setShowConfirmPassword((show) => !show)}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              size="large"
              sx={{
                borderRadius: 2,
                py: 1.4,
                fontWeight: 700,
                fontSize: "0.95rem",
                textTransform: "none",
                boxShadow: "none",
                "&:hover": { boxShadow: "none", opacity: 0.92 },
              }}
            >
              {isSubmitting ? "Resetting password..." : "Reset Password"}
            </Button>

            <Typography variant="body2" color="text.secondary" textAlign="center">
              Back to{" "}
              <Link href="/signin" style={{ textDecoration: "none" }}>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    color: "primary.main",
                    fontWeight: 700,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Sign In
                </Typography>
              </Link>
            </Typography>
          </Stack>
        </form>
      )}
    </Box>
  );
};

export default ResetPasswordForm;
