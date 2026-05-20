"use client";

import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import SubjectIcon from "@mui/icons-material/Subject";
import TitleIcon from "@mui/icons-material/Title";
import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ManuscriptInfoStepProps {
  handleNext: () => void;
}

const ManuscriptInfoStep: React.FC<ManuscriptInfoStepProps> = ({
  handleNext,
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
      {/* Section header */}
      <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            backgroundColor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            flexShrink: 0,
          }}
        >
          <ArticleOutlinedIcon fontSize="small" />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>
            Manuscript Details
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Provide the core information about your manuscript
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2.5}>
        {/* Title */}
        <Grid item xs={12}>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field, fieldState }) => (
              <TextField
                fullWidth
                label="Manuscript Title"
                placeholder="Enter the full title of your manuscript"
                variant="outlined"
                multiline
                minRows={2}
                maxRows={4}
                {...field}
                inputProps={{ className: "rtl:text-right rtl:placeholder:text-right" }}
                error={!!fieldState.error}
                helperText={
                  fieldState.error?.message ??
                  "Use a clear, descriptive title that reflects your research"
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ alignSelf: "flex-start", mt: 1.5 }}
                    >
                      <TitleIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        {/* Abstract */}
        <Grid item xs={12}>
          <Controller
            name="abstract"
            control={control}
            rules={{
              required: "Abstract is required",
              minLength: {
                value: 50,
                message: "Abstract should be at least 50 characters",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                fullWidth
                label="Abstract"
                placeholder="Provide a concise summary of your research (150–300 words recommended)"
                variant="outlined"
                multiline
                rows={5}
                {...field}
                inputProps={{
                  dir: "auto",
                  className: "rtl:text-right rtl:placeholder:text-right",
                }}
                error={!!fieldState.error}
                helperText={
                  fieldState.error?.message ??
                  `${field.value?.length ?? 0} characters \u2013 summarise the purpose, methods, results, and conclusions`
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ alignSelf: "flex-start", mt: 1.5 }}
                    >
                      <SubjectIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        {/* Keywords */}
        <Grid item xs={12}>
          <Controller
            name="keywords"
            control={control}
            rules={{ required: "Keywords are required" }}
            render={({ field, fieldState }) => (
              <TextField
                fullWidth
                label="Keywords (comma-separated)"
                placeholder="e.g. Machine Learning, Neural Networks, Deep Learning"
                variant="outlined"
                {...field}
                inputProps={{ className: "rtl:text-right rtl:placeholder:text-right" }}
                error={!!fieldState.error}
                helperText={
                  fieldState.error?.message ??
                  "Enter keywords separated by commas, e.g. Bioinformatics, Genomics, RNA"
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LabelOutlinedIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
      </Grid>

      {/* Navigation */}
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 4 }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ px: 4, borderRadius: 2, textTransform: "none", fontWeight: 600 }}
        >
          Next: Authors &amp; Reviewer →
        </Button>
      </Stack>
    </Box>
  );
};

export default ManuscriptInfoStep;
