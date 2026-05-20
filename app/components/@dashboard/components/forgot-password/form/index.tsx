"use client";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import {
  Alert,
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Auth } from "@/constants/config";

type ForgotPasswordFormValues = {
  email: string;
};

const ForgotPasswordForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { control, handleSubmit } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: "",
    },
  });
  const rtlInputProps = { className: "rtl:text-right rtl:placeholder:text-right" };

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch(Auth.requestResetPassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setSuccessMessage(
          result?.message ||
            "If this email is registered, a password reset link has been sent.",
        );
        return;
      }

      setErrorMessage(
        result?.message ||
          "Failed to request password reset. Please try again later.",
      );
    } catch (error) {
      setErrorMessage("Network error. Please check your connection and try again.");
      console.error("Failed to request reset password:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Stack spacing={0.5} mb={4}>
        <Typography variant="h5" fontWeight={800} color="text.primary">
          Forgot Password
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter your email and we will send you a password reset link.
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

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2.5}>
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
                label="Email Address"
                type="email"
                fullWidth
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
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
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
              "&:hover": { boxShadow: "none", opacity: 0.92 },
            }}
          >
            {isLoading ? "Sending reset link..." : "Send Reset Link"}
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
    </Box>
  );
};

export default ForgotPasswordForm;
