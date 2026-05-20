/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import {
  createVolume,
  deleteVolume,
  editVolume,
  getVolumes,
} from "@/app/api/volume";
import useNotification from "@/hooks/useNotification";
import { VolumeProps } from "@/types";

import VolumeCard from "../../components/volume-card";

const CEVolumeManagementTab = () => {
  const [volumes, setVolumes] = useState<VolumeProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState<
    "create" | "edit" | "delete" | null
  >(null);
  const [selectedVolume, setSelectedVolume] = useState<VolumeProps | null>(
    null,
  );
  const [volumeName, setVolumeName] = useState("");
  const [volumeDescription, setVolumeDescription] = useState("");
  const { notify } = useNotification();

  const fetchVolumes = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolumes();
  }, []);

  const handleDialogOpen = (
    type: "create" | "edit" | "delete",
    volume: VolumeProps | null = null,
  ) => {
    setDialogType(type);
    setSelectedVolume(volume);

    // Populate fields if editing
    if (type === "edit" && volume) {
      setVolumeName(volume.name);
      setVolumeDescription(volume.description);
    } else {
      setVolumeName("");
      setVolumeDescription("");
    }

    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setVolumeName("");
    setVolumeDescription("");
  };

  const handleCreateVolume = async () => {
    try {
      const response = await createVolume({
        name: volumeName,
        description: volumeDescription,
      });
      if (response.statusCode) {
        console.error(response.message || "Failed to create the volume.");
      } else {
        notify("Volume successfully created", { mode: "success" });
        fetchVolumes();
      }
    } catch (error) {
      notify("Failed to create volume", { mode: "error" });
    } finally {
      handleDialogClose();
    }
  };

  const handleEditVolume = async () => {
    if (!selectedVolume) return;
    try {
      const response = await editVolume(selectedVolume.id, {
        name: volumeName,
        description: volumeDescription,
      });
      if (response.statusCode) {
        console.error(response.message || "Failed to update the volume.");
      } else {
        notify("Volume successfully updated", { mode: "success" });
        fetchVolumes();
      }
    } catch (error) {
      notify("Failed to update volume", { mode: "error" });
    } finally {
      handleDialogClose();
    }
  };

  const handleDeleteVolume = async () => {
    if (!selectedVolume) return;
    try {
      const response = await deleteVolume(selectedVolume.id);
      if (response.statusCode) {
        console.error(response.message || "Failed to delete the volume.");
      } else {
        notify("Volume successfully deleted", { mode: "success" });
        fetchVolumes();
      }
    } catch (error) {
      notify("Failed to delete volume", { mode: "error" });
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
                {volumes.map((volume) => (
                  <VolumeCard
                    key={volume.id}
                    name={volume.name}
                    description={volume.description}
                    onDelete={() => handleDialogOpen("delete", volume)}
                    onEdit={() => handleDialogOpen("edit", volume)}
                  />
                ))}
              </Box>
            )}
          </div>
        </div>

        <Box display="flex" justifyContent="center" mt={10} alignItems="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => handleDialogOpen("create")}
          >
            Create Volume
          </Button>
        </Box>

        <Dialog open={open} onClose={handleDialogClose}>
          <DialogTitle
            sx={{
              fontSize: { xs: "1.2rem", sm: "1.2rem", md: "1.5rem" },
              fontWeight: "bold",
            }}
          >
            {dialogType === "create"
              ? "Create Volume"
              : dialogType === "edit"
                ? "Edit Volume"
                : "Delete Volume"}
          </DialogTitle>
          {dialogType !== "delete" ? (
            <DialogContent>
              <TextField
                autoFocus
                fullWidth
                margin="dense"
                label="Volume Name"
                value={volumeName}
                onChange={(e) => setVolumeName(e.target.value)}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Volume Description"
                value={volumeDescription}
                onChange={(e) => setVolumeDescription(e.target.value)}
              />
            </DialogContent>
          ) : (
            <DialogContent>
              <Typography>
                Are you sure you want to delete this volume?
              </Typography>
            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              Cancel
            </Button>
            {dialogType === "create" && (
              <Button onClick={handleCreateVolume} color="primary">
                Create
              </Button>
            )}
            {dialogType === "edit" && (
              <Button onClick={handleEditVolume} color="primary">
                Save
              </Button>
            )}
            {dialogType === "delete" && (
              <Button onClick={handleDeleteVolume} color="primary">
                Delete
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </main>
  );
};

export default CEVolumeManagementTab;
