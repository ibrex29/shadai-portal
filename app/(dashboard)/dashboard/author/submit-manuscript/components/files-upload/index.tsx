"use client";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { SubmitManuscriptProps } from "@/types";

const DocumentUpload = dynamic(
  () => import("@/app/components/document-upload"),
  { ssr: false },
);

interface FileUploadStepProps {
  handleSubmit: () => void;
  handleBack: () => void;
}

interface UploadSection {
  name: keyof Pick<
    SubmitManuscriptProps,
    "manuscriptLink" | "proofofPayment" | "otherDocsLink"
  >;
  label: string;
  description: string;
  formatHint: string;
  accept: string;
  icon: React.ReactNode;
  chipLabel: string;
  chipColor: "primary" | "warning" | "default";
}

const uploadSections: UploadSection[] = [
  {
    name: "manuscriptLink",
    label: "Manuscript File",
    description:
      "Upload your manuscript in PDF or DOCX format. Ensure it follows the journal\u2019s formatting guidelines.",
    formatHint: "Accepted formats: PDF, DOCX",
    accept: ".pdf,.docx",
    icon: <UploadFileOutlinedIcon fontSize="small" />,
    chipLabel: "Required",
    chipColor: "primary",
  },
  {
    name: "proofofPayment",
    label: "Proof of Payment",
    description:
      "Upload a receipt or screenshot confirming the submission/processing fee payment in PDF, JPG, JPEG, or PNG format.",
    formatHint: "Accepted formats: PDF, JPG, JPEG, PNG",
    accept: ".pdf,.jpg,.jpeg,.png",
    icon: <ReceiptOutlinedIcon fontSize="small" />,
    chipLabel: "Required",
    chipColor: "warning",
  },
  {
    name: "otherDocsLink",
    label: "Additional Documents",
    description:
      "Optional supplementary files such as cover letter, ethics clearance, or data appendices in PDF or DOCX format.",
    formatHint: "Accepted formats: PDF, DOCX",
    accept: ".pdf,.docx",
    icon: <AttachFileIcon fontSize="small" />,
    chipLabel: "Optional",
    chipColor: "default",
  },
];

const FileUploadStep: React.FC<FileUploadStepProps> = ({
  handleSubmit,
  handleBack,
}) => {
  const { setValue, getValues, setError } =
    useFormContext<SubmitManuscriptProps>();

  const validateAndSubmit = () => {
    const values = getValues();
    let hasError = false;

    if (!values.manuscriptLink) {
      setError("manuscriptLink", {
        type: "manual",
        message: "Please upload the manuscript file before proceeding.",
      });
      hasError = true;
    }
    if (!values.proofofPayment) {
      setError("proofofPayment", {
        type: "manual",
        message: "Please upload proof of payment before proceeding.",
      });
      hasError = true;
    }

    if (!hasError) handleSubmit();
  };

  return (
    <Box>
      {/* Section header */}
      <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            backgroundColor: "info.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            flexShrink: 0,
          }}
        >
          <UploadFileOutlinedIcon fontSize="small" />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>
            Document Uploads
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Upload your manuscript and supporting documents in the accepted formats below
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={2.5}>
        {uploadSections.map((section) => (
          <Controller
            key={section.name}
            name={section.name}
            render={({ fieldState: { error } }) => (
              <Paper
                variant="outlined"
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  borderColor: error ? "error.main" : "divider",
                  transition: "border-color 0.2s",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={1}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box sx={{ color: "primary.main" }}>{section.icon}</Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {section.label}
                    </Typography>
                  </Stack>
                  <Chip
                    label={section.chipLabel}
                    size="small"
                    color={section.chipColor}
                    sx={{ fontSize: "0.65rem", height: 20 }}
                  />
                </Stack>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  mb={1.5}
                >
                  {section.description}
                </Typography>
                <Typography
                  variant="caption"
                  color="primary.main"
                  display="block"
                  mb={1.5}
                  fontWeight={600}
                >
                  {section.formatHint}
                </Typography>

                <DocumentUpload
                  fieldName={section.name}
                  label={section.label}
                  accept={section.accept}
                  onUpload={(url) =>
                    setValue(section.name, url, { shouldValidate: true })
                  }
                  error={error?.message}
                />
              </Paper>
            )}
          />
        ))}
      </Stack>

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
          variant="contained"
          color="primary"
          size="large"
          onClick={validateAndSubmit}
          sx={{ px: 4, borderRadius: 2, textTransform: "none", fontWeight: 600 }}
        >
          Submit Manuscript
        </Button>
      </Stack>
    </Box>
  );
};

export default FileUploadStep;
