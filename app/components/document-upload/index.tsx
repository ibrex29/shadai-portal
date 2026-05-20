/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { baseUrl } from "@/constants/config";
import { getJournalSubdomain } from "@/utils/request";
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Upload as UploadIcon,
} from "@phosphor-icons/react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface DocumentUploadProps {
  fieldName: string;
  label: string;
  accept?: string;
  onUpload: (url: string) => void;
  error?: string;
  height?: string; 
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  fieldName,
  label,
  accept = ".doc,.docx,.pdf,.txt,.odt,.rtf,.jpg,.jpeg,.png",
  onUpload,
  error,
  height = "150px", 
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [uploading, setUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const sanitizeFileName = (fileName: string) => {
    return fileName.replace(/[^a-zA-Z0-9_.-]/g, "_");
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    const file = files[0];
    const uniqueId = uuidv4();
    const sanitizedFileName = sanitizeFileName(file.name);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${baseUrl}/v1/upload`, {
        method: "POST",
        headers: {
          accept: "*/*",
          "x-journal-subdomain": getJournalSubdomain(),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const result = await response.json();
      const fileUrl = result.fileUrl;
      onUpload(fileUrl);
      setUploadedFileName(sanitizedFileName);
    } catch (error) {
      onUpload("");
      setUploadedFileName("");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    handleFileUpload(files);
  };

  return (
    <Box sx={{ mb: 1.5 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <Box
        sx={{
          border: `1px dashed ${theme.palette.divider}`,
          borderRadius: "6px",
          padding: "16px",
          textAlign: "center",
          position: "relative",
          cursor: "pointer",
          width: "100%",
          height: height, // Use height prop
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.paper,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
        component="label"
        aria-label={`Upload ${label}`}
        htmlFor={`${fieldName}-file-input`}
      >
        <input
          id={`${fieldName}-file-input`}
          type="file"
          hidden
          accept={accept}
          onChange={handleFileChange}
          aria-describedby={`${fieldName}-upload-status`}
        />
        {uploading ? (
          <Stack
            direction={isSmallScreen ? "column" : "row"}
            alignItems="center"
            spacing={1}
          >
            <CircularProgress size={20} />
            <Typography variant="caption">Uploading...</Typography>
          </Stack>
        ) : uploadedFileName ? (
          <Stack
            direction={isSmallScreen ? "column" : "row"}
            alignItems="center"
            spacing={1}
          >
            <CheckCircleIcon size={32} color="success" />
            <Typography variant="caption">{uploadedFileName}</Typography>
          </Stack>
        ) : (
          <>
            <UploadIcon size={32} />
            <Typography variant="caption" sx={{ mt: 0.5 }}>
              Upload {label}
            </Typography>
          </>
        )}
        {error && (
          <Typography
            id={`${fieldName}-upload-status`}
            variant="caption"
            color="error"
            sx={{ mt: 0.5 }}
          >
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default DocumentUpload;