"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

interface CreateReviewFormProps {
  manuscriptId: string;
  onSubmit: (data: ReviewFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export interface ReviewFormData {
  manuscriptId: string;
  // Comments
  comments: string;
  commentsForEditors: string;
  
  // Checklist
  originality: string;
  methodology: string;
  references: string;
  grammar: string;
  
  // Overall Recommendation
  recommendation: string;
  
  // Preferences
  notifyOnFinalStatus: boolean;
  aiDeclarationConfirmed: boolean;
}

const CreateReviewForm: React.FC<CreateReviewFormProps> = ({
  manuscriptId,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState<ReviewFormData>({
    manuscriptId,
    comments: "",
    commentsForEditors: "",
    originality: "",
    methodology: "",
    references: "",
    grammar: "",
    recommendation: "",
    notifyOnFinalStatus: false,
    aiDeclarationConfirmed: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof ReviewFormData, value: string | boolean | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Comments for authors
    if (!formData.comments.trim())
      newErrors.comments = "Comments for authors are required";

    // Required checklist fields
    if (!formData.originality)
      newErrors.originality = "This field is required";
    if (!formData.methodology)
      newErrors.methodology = "This field is required";
    if (!formData.references)
      newErrors.references = "This field is required";
    if (!formData.grammar)
      newErrors.grammar = "This field is required";

    // Overall recommendation
    if (!formData.recommendation)
      newErrors.recommendation = "Overall recommendation is required";

    // AI Declaration
    if (!formData.aiDeclarationConfirmed)
      newErrors.aiDeclarationConfirmed =
        "You must confirm the AI declaration to submit";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        {/* Review Checklist Section */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Review Checklist
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
          Please evaluate the manuscript across the following criteria.
        </Typography>

        {/* Originality */}
        <FormControl
          component="fieldset"
          fullWidth
          sx={{ mb: 3 }}
          error={!!errors.originality}
        >
          <FormLabel component="legend" sx={{ mb: 1, fontSize: "14px" }}>
            <Typography component="span" color="error">*</Typography>{" "}
            Originality — Is the work original and does it make a significant contribution?
          </FormLabel>
          <RadioGroup
            row
            value={formData.originality}
            onChange={(e) => handleChange("originality", e.target.value)}
          >
            <FormControlLabel value="YES" control={<Radio />} label="Yes" />
            <FormControlLabel value="CAN_BE_IMPROVED" control={<Radio />} label="Can be improved" />
            <FormControlLabel value="MUST_BE_IMPROVED" control={<Radio />} label="Must be improved" />
          </RadioGroup>
          {errors.originality && (
            <Typography variant="caption" color="error">{errors.originality}</Typography>
          )}
        </FormControl>

        {/* Methodology */}
        <FormControl
          component="fieldset"
          fullWidth
          sx={{ mb: 3 }}
          error={!!errors.methodology}
        >
          <FormLabel component="legend" sx={{ mb: 1, fontSize: "14px" }}>
            <Typography component="span" color="error">*</Typography>{" "}
            Methodology — Are the methods sound, well-described, and reproducible?
          </FormLabel>
          <RadioGroup
            row
            value={formData.methodology}
            onChange={(e) => handleChange("methodology", e.target.value)}
          >
            <FormControlLabel value="YES" control={<Radio />} label="Yes" />
            <FormControlLabel value="CAN_BE_IMPROVED" control={<Radio />} label="Can be improved" />
            <FormControlLabel value="MUST_BE_IMPROVED" control={<Radio />} label="Must be improved" />
          </RadioGroup>
          {errors.methodology && (
            <Typography variant="caption" color="error">{errors.methodology}</Typography>
          )}
        </FormControl>

        {/* References */}
        <FormControl
          component="fieldset"
          fullWidth
          sx={{ mb: 3 }}
          error={!!errors.references}
        >
          <FormLabel component="legend" sx={{ mb: 1, fontSize: "14px" }}>
            <Typography component="span" color="error">*</Typography>{" "}
            References — Are the references adequate, relevant, and properly cited?
          </FormLabel>
          <RadioGroup
            row
            value={formData.references}
            onChange={(e) => handleChange("references", e.target.value)}
          >
            <FormControlLabel value="YES" control={<Radio />} label="Yes" />
            <FormControlLabel value="CAN_BE_IMPROVED" control={<Radio />} label="Can be improved" />
            <FormControlLabel value="MUST_BE_IMPROVED" control={<Radio />} label="Must be improved" />
          </RadioGroup>
          {errors.references && (
            <Typography variant="caption" color="error">{errors.references}</Typography>
          )}
        </FormControl>

        {/* Grammar */}
        <FormControl
          component="fieldset"
          fullWidth
          sx={{ mb: 3 }}
          error={!!errors.grammar}
        >
          <FormLabel component="legend" sx={{ mb: 1, fontSize: "14px" }}>
            <Typography component="span" color="error">*</Typography>{" "}
            Grammar — Is the language clear, grammatically correct, and well-written?
          </FormLabel>
          <RadioGroup
            row
            value={formData.grammar}
            onChange={(e) => handleChange("grammar", e.target.value)}
          >
            <FormControlLabel value="YES" control={<Radio />} label="Yes" />
            <FormControlLabel value="CAN_BE_IMPROVED" control={<Radio />} label="Can be improved" />
            <FormControlLabel value="MUST_BE_IMPROVED" control={<Radio />} label="Must be improved" />
          </RadioGroup>
          {errors.grammar && (
            <Typography variant="caption" color="error">{errors.grammar}</Typography>
          )}
        </FormControl>

        <Divider sx={{ my: 4 }} />

        {/* Comments for Authors */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          <Typography component="span" color="error">
            *
          </Typography>{" "}
          Comments for Authors{" "}
          <Typography component="span" sx={{ fontSize: "14px", color: "text.secondary" }}>
            (will be shown to authors)
          </Typography>
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={6}
          placeholder="Provide detailed feedback for the authors..."
          value={formData.comments}
          onChange={(e) => handleChange("comments", e.target.value)}
          error={!!errors.comments}
          helperText={errors.comments}
          sx={{ mb: 3 }}
          required
        />

        {/* Comments for Editors */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          Comments for Editors{" "}
          <Typography component="span" sx={{ fontSize: "14px", color: "text.secondary" }}>
            (will not be shown to authors)
          </Typography>
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Optional confidential comments for the editorial team..."
          value={formData.commentsForEditors}
          onChange={(e) => handleChange("commentsForEditors", e.target.value)}
          sx={{ mb: 3 }}
        />

        <Divider sx={{ my: 4 }} />

        {/* Overall Recommendation */}
        <FormControl
          component="fieldset"
          fullWidth
          sx={{ mb: 3 }}
          error={!!errors.recommendation}
          required
        >
          <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
            <Typography component="span" color="error">
              *
            </Typography>{" "}
            Overall Recommendation
          </FormLabel>
          <RadioGroup
            value={formData.recommendation}
            onChange={(e) => handleChange("recommendation", e.target.value)}
          >
            <FormControlLabel
              value="ACCEPT"
              control={<Radio />}
              label="Accept in present form"
            />
            <FormControlLabel
              value="MINOR_REVISIONS"
              control={<Radio />}
              label="Accept after minor revision (corrections to minor methodological errors and text editing)"
            />
            <FormControlLabel
              value="MAJOR_REVISIONS"
              control={<Radio />}
              label="Reconsider after major revision (substantial revisions to text or experimental methods needed)"
            />
            <FormControlLabel
              value="REJECT"
              control={<Radio />}
              label="Reject (article has serious flaws, additional experiments needed, research not conducted correctly)"
            />
          </RadioGroup>
          {errors.recommendation && (
            <Typography variant="caption" color="error">
              {errors.recommendation}
            </Typography>
          )}
        </FormControl>

        <Divider sx={{ my: 4 }} />

        {/* Notification Preference */}
        <FormControl
          component="fieldset"
          fullWidth
          sx={{ mb: 3 }}
          required
        >
          <FormLabel component="legend" sx={{ mb: 1, fontWeight: 600 }}>
            <Typography component="span" color="error">
              *
            </Typography>{" "}
            Please confirm whether you would like to be notified about the final
            status of the paper
          </FormLabel>
          <RadioGroup
            row
            value={formData.notifyOnFinalStatus ? "yes" : "no"}
            onChange={(e) =>
              handleChange("notifyOnFinalStatus", e.target.value === "yes")
            }
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
          To ensure your anonymity throughout the peer-review process, please do
          not include any identifiable information in your review report, including
          in the comments and metadata of any files that you upload.
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
          Comments for authors may be made available to other reviewers, but your
          identity will remain anonymous.
        </Typography>

        {/* AI Declaration */}
        <FormControl
          error={!!errors.aiDeclarationConfirmed}
          required
          sx={{ mb: 3 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.aiDeclarationConfirmed}
                onChange={(e) =>
                  handleChange("aiDeclarationConfirmed", e.target.checked)
                }
              />
            }
            label={
              <Typography variant="body2">
                <Typography component="span" color="error">
                  *
                </Typography>{" "}
                I confirm that I did not use any generative AI or AI-assisted
                technological methods to prepare this reviewer report. The review
                report was prepared by myself from my own evaluation and writing.
              </Typography>
            }
          />
          {errors.aiDeclarationConfirmed && (
            <Typography variant="caption" color="error">
              {errors.aiDeclarationConfirmed}
            </Typography>
          )}
        </FormControl>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
            startIcon={isSubmitting && <CircularProgress size={16} />}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateReviewForm;
