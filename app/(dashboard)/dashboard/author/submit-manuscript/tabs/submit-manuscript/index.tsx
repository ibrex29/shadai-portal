/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import {
  Box,
  Button,
  Paper,
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { submitManuscript } from "@/app/api/manuscript";
import { SubmitManuscriptProps } from "@/types";

import ContactInfoStep from "../../components/contact-info";
import FileUploadStep from "../../components/files-upload";
import ManuscriptInfoStep from "../../components/manuscript-info";
import Loader from "@/app/components/@dashboard/components/loader";
import useNotification from "@/hooks/useNotification";
import ManuscriptSubHeader from "@/app/components/@dashboard/components/@dashboard/common/sub-header/my-manuscript";

// ─── Custom Stepper Icons ────────────────────────────────────────────────────

const stepIcons: React.ReactNode[] = [
  <ArticleOutlinedIcon fontSize="small" />,
  <PersonOutlineIcon fontSize="small" />,
  <UploadFileOutlinedIcon fontSize="small" />,
];

function CustomStepIcon(props: StepIconProps) {
  const { active, completed, className, icon } = props;
  const iconIndex = (icon as number) - 1;

  return (
    <Box
      className={className}
      sx={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.8rem",
        fontWeight: 700,
        transition: "all 0.2s",
        backgroundColor: completed
          ? "success.main"
          : active
            ? "primary.main"
            : "grey.300",
        color: completed || active ? "white" : "grey.600",
        boxShadow: active ? "0 4px 14px rgba(0,0,0,0.18)" : "none",
      }}
    >
      {completed ? (
        <CheckCircleOutlineIcon sx={{ fontSize: "1.1rem" }} />
      ) : (
        stepIcons[iconIndex]
      )}
    </Box>
  );
}

// ─── Step config ─────────────────────────────────────────────────────────────

const steps = ["Manuscript Details", "Authors & Reviewer", "Document Uploads"];

// ─── Main Form ────────────────────────────────────────────────────────────────

const MultiStepForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const methods = useForm<SubmitManuscriptProps>();
  const [activeStep, setActiveStep] = useState(0);
  const { notify } = useNotification();

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const { mutateAsync: submitManuscriptMutation } = useMutation({
    mutationFn: submitManuscript,
    onSuccess: () => {
      notify("Manuscript Submitted Successfully", { mode: "success" });
    },
    onError: (error: unknown) => {
      let msg = "Unknown error occurred";
      if (error instanceof Error) {
        msg = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        msg = (error as any).response?.data?.message || msg;
      }
      notify(`Failed to submit manuscript: ${msg}`, { mode: "error" });
    },
  });

  const handleFinalSubmit = async (data: SubmitManuscriptProps) => {
    setLoading(true);
    try {
      await submitManuscriptMutation(data);
      methods.reset();
      setActiveStep(steps.length); // show success screen
    } catch (_) {
      /* error handled in onError */
    }
    setLoading(false);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ManuscriptInfoStep handleNext={handleNext} />;
      case 1:
        return (
          <ContactInfoStep handleNext={handleNext} handleBack={handleBack} />
        );
      case 2:
        return (
          <FileUploadStep
            handleSubmit={methods.handleSubmit(handleFinalSubmit)}
            handleBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <ManuscriptSubHeader
        title="Submit Manuscript"
        subtitle="Complete all steps to submit your manuscript for peer review"
      />

      <Box sx={{ mt: 3 }}>
        <FormProvider {...methods}>
          {/* Stepper */}
          <Paper
            variant="outlined"
            sx={{ p: { xs: 2, md: 3 }, mb: 3, borderRadius: 3 }}
          >
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={CustomStepIcon}
                    sx={{
                      "& .MuiStepLabel-label": {
                        fontSize: "0.78rem",
                        fontWeight: activeStep === index ? 700 : 500,
                        mt: 0.5,
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>

          {/* Step content */}
          {activeStep === steps.length ? (
            /* ─── Success screen ─── */
            <Paper
              variant="outlined"
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  backgroundColor: "success.light",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2,
                }}
              >
                <CheckCircleOutlineIcon
                  sx={{ fontSize: "2.5rem", color: "success.main" }}
                />
              </Box>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Submission Complete!
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 440, mx: "auto", mb: 3 }}
              >
                Thank you for submitting your manuscript. Our editorial team
                will review it and get back to you via email.
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{ borderRadius: 2, textTransform: "none", px: 4 }}
                onClick={() => setActiveStep(0)}
              >
                Submit Another Manuscript
              </Button>
            </Paper>
          ) : (
            /* ─── Form step panel ─── */
            <Paper
              variant="outlined"
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
              }}
            >
              {getStepContent(activeStep)}
            </Paper>
          )}
        </FormProvider>
      </Box>
    </>
  );
};

export default MultiStepForm;
