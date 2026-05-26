/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { getSession, signIn } from "next-auth/react";
import React, { FC, MouseEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { rolesMap } from "@/types";

const SigninForm: FC = () => {
  const router = useRouter();

  const [isError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const rtlInputProps = { className: "rtl:text-right rtl:placeholder:text-right" };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const login = async (data: any) => {
    setIsLoading(true);
    setShowError(false);
    try {
      const res = await signIn("credentials", { redirect: false, ...data });

      if (res?.error) {
        // Login failed
        setShowError(true);
      } else if (res?.ok) {
        // Login successful. Try to fetch an updated session a few times
        // because session propagation can be slightly delayed.
        const getSessionWithRetries = async (retries = 5, delay = 300) => {
          for (let i = 0; i < retries; i++) {
            const s = await getSession();
            if (s && s.user?.role) return s;
            // small backoff
            // eslint-disable-next-line no-await-in-loop
            await new Promise((r) => setTimeout(r, delay * (i + 1)));
          }
          return null;
        };

        const user: Session | null | undefined = await getSessionWithRetries();

        if (user && user.user?.role) {
          const route = rolesMap[user.user.role.toLowerCase()] || "/dashboard";
          router.replace(route.toLowerCase());
          // ensure server components refresh where needed
          router.refresh();
        } else {
          // fallback: if we couldn't read the role yet, navigate to dashboard
          // so the app can pick up the session cookie and server-side redirects.
          console.debug("Signin succeeded but session not available yet, falling back to /dashboard");
          router.replace("/");
          router.refresh();
        }
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Heading */}
      <Stack spacing={0.5} mb={4}>
        <Typography variant="h5" fontWeight={800} color="text.primary">
          Welcome back
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sign in to your account to continue
        </Typography>
      </Stack>

      {isError && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          Invalid email or password. Please try again.
        </Alert>
      )}

      <form onSubmit={handleSubmit(login)} noValidate>
        <Stack spacing={2.5} sx={{ width: "100%" }}>
          {/* Email */}
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

          {/* Password */}
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                autoComplete="current-password"
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
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            )}
          />

          {/* Forgot password */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: -1 }}>
            <Link href="/forgot-password" style={{ textDecoration: "none" }}>
              <Typography
                variant="caption"
                sx={{ color: "primary.main", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}
              >
                Forgot password?
              </Typography>
            </Link>
          </Box>

          {/* Submit */}
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
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          {/* Divider */}
          <Divider sx={{ my: 0.5 }}>
            <Typography variant="caption" color="text.disabled">
              OR
            </Typography>
          </Divider>

          {/* Sign up link */}
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" style={{ textDecoration: "none" }}>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: "primary.main", fontWeight: 700, "&:hover": { textDecoration: "underline" } }}
              >
                Create an account
              </Typography>
            </Link>
          </Typography>
        </Stack>
      </form>
    </Box>
  );
};

export default SigninForm;
