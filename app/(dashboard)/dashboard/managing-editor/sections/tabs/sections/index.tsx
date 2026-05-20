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

import { createSection, editSection, getSection } from "@/app/api/sections";
import useNotification from "@/hooks/useNotification";
import { SectionProps } from "@/types";

import SectionCard from "../../components/section-card";

const SectionManagementTab = () => {
  const [sections, setSections] = useState<SectionProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState<
    "create" | "edit" | "delete" | null
  >(null);
  const [selectedSection, setSelectedSection] = useState<SectionProps | null>(
    null,
  );
  const [sectionName, setSectionName] = useState("");
  const { notify } = useNotification();

  const fetchSections = async () => {
    setLoading(true);
    try {
      const data = await getSection();
      if (Array.isArray(data)) {
        setSections(data);
      } else {
        console.error("Expected an array but got:", data);
        setSections([]);
      }
    } catch (error) {
      console.error("Error fetching sections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleDialogOpen = (
    type: "create" | "edit" | "delete",
    section: SectionProps | null = null,
  ) => {
    setDialogType(type);
    setSelectedSection(section);
    setSectionName(section?.name || "");
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setSectionName("");
  };

  const handleCreateSection = async () => {
    try {
      const response = await createSection(sectionName);
      if (response.statusCode) {
        console.error(response.message || "Failed to create the section.");
      } else {
        notify("Section successfully created", { mode: "success" });

        fetchSections();
      }
    } catch (error) {
      notify("Failed to create section", { mode: "error" });
    } finally {
      handleDialogClose();
    }
  };

  const handleEditSection = async () => {
    if (!selectedSection) return;
    try {
      const response = await editSection(selectedSection.id, sectionName);
      if (response.statusCode) {
        console.error(response.message || "Failed to update the section.");
      } else {
        notify("Section successfully updated", { mode: "success" });
        fetchSections();
      }
    } catch (error) {
      notify("Failed to update section", { mode: "error" });
    } finally {
      handleDialogClose();
    }
  };

  const handleDeleteSection = async () => {
    if (!selectedSection) return;
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
                {sections.map((section) => (
                  <SectionCard
                    key={section.id}
                    name={section.name}
                    onDelete={() => handleDialogOpen("delete", section)}
                    onEdit={() => handleDialogOpen("edit", section)}
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
            Create Section
          </Button>
        </Box>

        <Dialog open={open} onClose={handleDialogClose}>
          <DialogTitle>
            {dialogType === "create"
              ? "Create Section"
              : dialogType === "edit"
                ? "Edit Section"
                : "Delete Section"}
          </DialogTitle>
          {dialogType !== "delete" ? (
            <DialogContent>
              <TextField
                autoFocus
                fullWidth
                margin="dense"
                label="Section Name"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
              />
            </DialogContent>
          ) : (
            <DialogContent>
              <Typography>
                Are you sure you want to delete this section?
              </Typography>
            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              Cancel
            </Button>
            {dialogType === "create" && (
              <Button onClick={handleCreateSection} color="primary">
                Create
              </Button>
            )}
            {dialogType === "edit" && (
              <Button onClick={handleEditSection} color="primary">
                Save
              </Button>
            )}
            {dialogType === "delete" && (
              <Button onClick={handleDeleteSection} color="primary">
                Delete
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </main>
  );
};

export default SectionManagementTab;
