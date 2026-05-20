/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import {
  createIssue,
  deleteIssue,
  editIssue,
  getVolumes,
} from "@/app/api/volume";
import { getIssues } from "@/app/api/volume";
import useNotification from "@/hooks/useNotification";
import { IssueProps, VolumeProps } from "@/types";

import IssueCard from "../../components/issue-card";

const CEIssueManagementTab = () => {
  const [volumes, setVolumes] = useState<VolumeProps[]>([]);
  const [issues, setIssues] = useState<IssueProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState<
    "create" | "edit" | "delete" | null
  >(null);
  const [selectedIssue, setSelectedIssue] = useState<IssueProps | null>(null);
  const [issueName, setIssueName] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [selectedVolumeId, setSelectedVolumeId] = useState<string | "">("");
  const { notify } = useNotification();

  const fetchVolumes = async () => {
    try {
      const data = await getVolumes();
      if (Array.isArray(data)) {
        setVolumes(data);
      } else {
        console.error("Expected an array but got:", data);
        setVolumes([]);
      }
    } catch (error) {
      console.error("Error fetching volumes:", error);
    }
  };

  const fetchIssues = async () => {
    setLoading(true);

    try {
      const data = await getIssues();
      if (Array.isArray(data)) {
        setIssues(data);
      } else {
        console.error("Expected an array but got:", data);
        setIssues([]);
      }
    } catch (error) {
      console.error("Error fetching volumes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolumes();
    fetchIssues();
  }, []);

  const handleDialogOpen = (
    type: "create" | "edit" | "delete",
    issue: IssueProps | null = null,
  ) => {
    setDialogType(type);
    setSelectedIssue(issue);
    setIssueName(issue?.name || "");
    setIssueDescription(issue?.description || "");
    setSelectedVolumeId(issue?.volumeId || "");
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setIssueName("");
    setIssueDescription("");
    setSelectedVolumeId("");
  };

  const handleCreateIssue = async () => {
    try {
      const response = await createIssue({
        name: issueName,
        description: issueDescription,
        volumeId: selectedVolumeId,
      });
      if (response.statusCode) {
        console.error(response.message || "Failed to create the issue.");
      } else {
        notify("Issue successfully created", { mode: "success" });
        fetchIssues();
      }
    } catch (error) {
      notify("Failed to create issue", { mode: "error" });
    } finally {
      handleDialogClose();
    }
  };

  const handleEditIssue = async () => {
    if (!selectedIssue) return;
    const payload = {
      name: issueName,
      description: issueDescription,
      volumeId: selectedVolumeId,
    };
    try {
      const response = await editIssue(selectedIssue.id, payload);
      if (response.statusCode) {
        console.error(response.message || "Failed to update the issue.");
      } else {
        notify("Issue successfully updated", { mode: "success" });
        fetchIssues();
      }
    } catch (error) {
      notify("Failed to update issue", { mode: "error" });
    } finally {
      handleDialogClose();
    }
  };

  const handleDeleteIssue = async () => {
    if (!selectedIssue) return;
    try {
      const response = await deleteIssue(selectedIssue.id);
      if (response.statusCode) {
        console.error(response.message || "Failed to delete the volume.");
      } else {
        notify("Issue successfully deleted", { mode: "success" });
        fetchVolumes();
      }
    } catch (error) {
      notify("Failed to delete issue", { mode: "error" });
    } finally {
      handleDialogClose();
    }
  };

  return (
    <main className="w-full my-4 md:my-10 flex justify-center bg-white items-center p-8">
      <div className="flex flex-col w-full">
        <div className="flex w-full max-w-5xl justify-between gap-12">
          <div className="w-full mb-10 flex flex-col">
            {loading ? (
              <Box
                display="flex"
                flexWrap="wrap"
                gap={4}
                maxHeight="80"
                overflow="auto"
              >
                {[...Array(3)].map((_, index) => (
                  <Box key={index} width={{ xs: "100%", sm: "32%", md: "25%" }}>
                    <Skeleton variant="rectangular" height={100} width="100%" />
                    <Skeleton height={20} width="60%" className="mt-2" />
                  </Box>
                ))}
              </Box>
            ) : (
              <Box
                display="flex"
                flexWrap="wrap"
                gap={4}
                maxHeight="80"
                overflow="auto"
              >
                {issues.map((issue) => (
                  <IssueCard
                    key={issue.id}
                    name={issue.name}
                    description={issue.description}
                    onDelete={() => handleDialogOpen("delete", issue)}
                    onEdit={() => handleDialogOpen("edit", issue)}
                  />
                ))}
              </Box>
            )}
          </div>
        </div>{" "}
        <Box display="flex" justifyContent="center" mt={10} alignItems="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => handleDialogOpen("create")}
          >
            Create Issue
          </Button>
        </Box>
        <Dialog open={open} onClose={handleDialogClose}>
          <DialogTitle
            sx={{
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
              fontWeight: "bold",
            }}
          >
            {dialogType === "create"
              ? "Create Issue"
              : dialogType === "edit"
                ? "Edit Issue"
                : "Delete Issue"}
          </DialogTitle>
          {dialogType !== "delete" ? (
            <DialogContent>
              <TextField
                autoFocus
                fullWidth
                margin="dense"
                label="Issue Name"
                value={issueName}
                onChange={(e) => setIssueName(e.target.value)}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Issue Description"
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel id="volume-select-label">Volume</InputLabel>
                <Select
                  labelId="volume-select-label"
                  value={selectedVolumeId}
                  onChange={(e) => setSelectedVolumeId(e.target.value)}
                >
                  {volumes.map((volume) => (
                    <MenuItem key={volume.id} value={volume.id}>
                      {volume.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
          ) : (
            <DialogContent>
              <Typography>
                Are you sure you want to delete this issue?
              </Typography>
            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              Cancel
            </Button>
            {dialogType === "create" && (
              <Button onClick={handleCreateIssue} color="primary">
                Create
              </Button>
            )}
            {dialogType === "edit" && (
              <Button onClick={handleEditIssue} color="primary">
                Save
              </Button>
            )}
            {dialogType === "delete" && (
              <Button onClick={handleDeleteIssue} color="primary">
                Delete
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </main>
  );
};

export default CEIssueManagementTab;
