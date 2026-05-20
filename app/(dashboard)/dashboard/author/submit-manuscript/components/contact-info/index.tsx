"use client";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ContactInfoProps {
  handleNext: () => void;
  handleBack: () => void;
}

const ContactInfoStep: React.FC<ContactInfoProps> = ({
  handleNext,
  handleBack,
}) => {
  const { control, handleSubmit } = useFormContext();

  const onSubmit = () => handleNext();

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* ─── Author Information ─── */}
      <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            backgroundColor: "secondary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            flexShrink: 0,
          }}
        >
          <PersonOutlineIcon fontSize="small" />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>
            Author Information
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Details of the submitting and contributing authors
          </Typography>
        </Box>
      </Stack>

      <Grid container spacing={2.5} mb={3}>
        <Grid item xs={12} md={6}>
          <Controller
            name="author"
            control={control}
            rules={{ required: "Author name is required" }}
            render={({ field, fieldState }) => (
              <TextField
                fullWidth
                label="Corresponding Author"
                placeholder="Full name of the primary author"
                variant="outlined"
                {...field}
                error={!!fieldState.error}
                helperText={
                  fieldState.error?.message ??
                  "Name of the author responsible for correspondence"
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="coAuthors"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Co-Authors (optional)"
                placeholder="e.g. Salisu Garba, Aisha Musa"
                variant="outlined"
                {...field}
                helperText="Separate multiple co-author names with commas"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GroupOutlinedIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
      </Grid>

      <Divider sx={{ mb: 3 }} />

      {/* ─── Suggested Reviewer ─── */}
      <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            backgroundColor: "success.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            flexShrink: 0,
          }}
        >
          <PersonSearchIcon fontSize="small" />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>
            Suggested Reviewer
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Optionally suggest a qualified reviewer for your manuscript (all fields are optional)
          </Typography>
        </Box>
      </Stack>

      <Paper
        variant="outlined"
        sx={{
          p: 2.5,
          borderRadius: 2,
          borderColor: "divider",
          backgroundColor: "action.hover",
        }}
      >
        <Grid container spacing={2.5}>
          {/* Reviewer Name */}
          <Grid item xs={12} md={6}>
            <Controller
              name="suggestedReviewer.name"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  fullWidth
                  label="Reviewer Name"
                  placeholder="e.g. Prof. Nasir Faruk"
                  variant="outlined"
                  size="small"
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon
                          fontSize="small"
                          color="action"
                          sx={{ fontSize: "1rem" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>

          {/* Reviewer Email */}
          <Grid item xs={12} md={6}>
            <Controller
              name="suggestedReviewer.email"
              control={control}
              rules={{
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  fullWidth
                  label="Reviewer Email"
                  placeholder="e.g. reviewer@university.edu"
                  variant="outlined"
                  size="small"
                  type="email"
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon
                          fontSize="small"
                          color="action"
                          sx={{ fontSize: "1rem" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>

          {/* Reviewer Phone */}
          <Grid item xs={12} md={6}>
            <Controller
              name="suggestedReviewer.phone"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  fullWidth
                  label="Reviewer Phone"
                  placeholder="e.g. +2348012345678"
                  variant="outlined"
                  size="small"
                  type="tel"
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneOutlinedIcon
                          fontSize="small"
                          color="action"
                          sx={{ fontSize: "1rem" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>

          {/* Reviewer Affiliation */}
          <Grid item xs={12} md={6}>
            <Controller
              name="suggestedReviewer.affiliation"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  fullWidth
                  label="Reviewer Affiliation"
                  placeholder="e.g. Bayero University, Kano"
                  variant="outlined"
                  size="small"
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SchoolOutlinedIcon
                          fontSize="small"
                          color="action"
                          sx={{ fontSize: "1rem" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Navigation */}
      <Stack direction="row" justifyContent="space-between" sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          size="large"
          onClick={handleBack}
          sx={{ px: 3, borderRadius: 2, textTransform: "none" }}
        >
          ← Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ px: 4, borderRadius: 2, textTransform: "none", fontWeight: 600 }}
        >
          Next: Document Uploads →
        </Button>
      </Stack>
    </Box>
  );
};

export default ContactInfoStep;
