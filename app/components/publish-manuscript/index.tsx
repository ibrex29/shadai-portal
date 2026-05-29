/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import useNotification from "@/hooks/useNotification";
import { useQuery } from "@tanstack/react-query";
import { getVolume } from "@/app/api/(landing-page)/volume";
import { Volume, Issue } from "@/types";

const sampleVolumes: Volume[] = [
  {
    id: "vol-1",
    name: "Volume 1",
    issues: [{ id: "iss-1", name: "Issue 1" } as Issue],
  } as Volume,
  {
    id: "vol-2",
    name: "Volume 2",
    issues: [{ id: "iss-2", name: "Issue 2" } as Issue],
  } as Volume,
];

const PublishManuscriptInner: React.FC = () => {
  const {
    control,
    setValue,
    getValues,
    setError,
    reset,
    watch,
    formState: { errors: formErrors },
  } = useFormContext();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [fetchError, setFetchError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const { notify } = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use TanStack Query to fetch and cache volumes. Keeps component from
  // repeatedly re-rendering when endpoint returns identical/empty results.
  const volumesQuery = useQuery<Volume[], Error>({
    queryKey: ["volumes"],
    queryFn: async () => {
      try {
        const response = await getVolume();
        // Prevent re-renders with empty data: always fall back to sampleVolumes if empty
        return (response && response.length > 0) ? response : sampleVolumes;
      } catch (error) {
        // Return sampleVolumes on error to avoid breaking the form
        return sampleVolumes;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    initialData: sampleVolumes,
  });

  const volumesList: Volume[] = volumesQuery.data ?? sampleVolumes;
  const loading = volumesQuery.isLoading && !volumesQuery.data?.length;

  useEffect(() => {
    if (volumesQuery.error) {
      const errorMessage = volumesQuery.error instanceof Error ? volumesQuery.error.message : String(volumesQuery.error);
      setFetchError(`Unable to load volumes: ${errorMessage}`);
      notify(`Unable to load volumes: ${errorMessage}`, { mode: "error" });
    } else {
      setFetchError("");
    }
  }, [volumesQuery.error, notify]);

  const watchedVolumeId = watch("volume");

  useEffect(() => {
    if (!watchedVolumeId) {
      setIssues([]);
      setValue("issue", "");
      return;
    }

    const selectedVolume = volumesList.find((v) => v.id === watchedVolumeId);
    if (selectedVolume && selectedVolume.issues) {
      setIssues(selectedVolume.issues);
      setValue("issue", selectedVolume.issues[0]?.id ?? "");
    } else {
      setIssues([]);
      setValue("issue", "");
    }
  }, [watchedVolumeId, volumesList, setValue]);

  const cleanAuthorsInput = (value: string) => {
    return value
      .replace(/[^a-zA-Z\s,-]/g, "") // Remove all characters except letters, spaces, commas, and hyphens
      .replace(/\s*,\s*/g, ", ") // Normalize spacing around commas
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .trim();
  };

  const validateAndSubmit = async () => {
    // Log entry to help debug repeated submissions
    // eslint-disable-next-line no-console
    console.debug("validateAndSubmit called", { timestamp: Date.now(), isSubmitting });

    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);
    const values = getValues();
    const newErrors: { [key: string]: string } = {};

    if (!values.manuscriptLink) {
      newErrors.manuscriptLink =
        "Please upload the manuscript file before proceeding.";
    }
    if (!values.title) {
      newErrors.title = "Title is required.";
    }
    if (!values.abstract) {
      newErrors.abstract = "Abstract is required.";
    }
    if (!values.authors || values.authors.length === 0) {
      newErrors.authors = "At least one author is required.";
    }
    if (!values.keywords) {
      newErrors.keywords = "Keywords are required.";
    }
    if (!values.doi) {
      newErrors.doi = "DOI is required.";
    }
    if (!values.volume) {
      newErrors.volume = "Volume is required.";
    }
    if (!values.issue) {
      newErrors.issue = "Issue is required.";
    }
    if (
      !values.startPage ||
      isNaN(Number(values.startPage)) ||
      Number(values.startPage) <= 0
    ) {
      newErrors.startPage = "Please enter a valid start page number.";
    }
    if (
      !values.endPage ||
      isNaN(Number(values.endPage)) ||
      Number(values.endPage) <= 0
    ) {
      newErrors.endPage = "Please enter a valid end page number.";
    }
    if (
      values.startPage &&
      values.endPage &&
      Number(values.startPage) > Number(values.endPage)
    ) {
      newErrors.endPage =
        "End page must be greater than or equal to start page.";
    }

    if (Object.keys(newErrors).length > 0) {
      Object.entries(newErrors).forEach(([field, message]) => {
        setError(field as keyof typeof values, { type: "manual", message });
      });
      return;
    }

    const publicationData = {
      title: values.title,
      abstract: values.abstract,
      authors: values.authors.split(",").map((author: string) => author.trim()),
      keywords: values.keywords,
      issue: values.issue,
      doi: values.doi,
      pageRange: `pp. ${values.startPage}-${values.endPage}`,
      formattedManuscript: values.manuscriptLink,
    };

    try {
      // API integration disconnected: mock publish behavior only.
      // eslint-disable-next-line no-console
      console.debug("mock publish called", publicationData);
      notify("Manuscript Published Successfully (mock)", { mode: "success" });
      reset();
      setSubmitError("");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setSubmitError(
        `Failed to submit publication: ${errorMessage}. Please try again.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary"></div>
      </div>
    );
  }

  return (
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-5xl">
        <p className="mb-4 italic">
          Please fill out this form to publish your manuscript. All fields are
          required.
        </p>
        <div className="space-y-6">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <div>
                <label className="mb-1 block text-start text-sm font-medium text-gray-700">
                  Title *
                </label>
                <input
                  {...field}
                  type="text"
                  className={`w-full rounded-lg border p-3 rtl:text-right rtl:placeholder:text-right ${formErrors.title ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter manuscript title"
                />
                {formErrors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.title.message as string}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="abstract"
            control={control}
            render={({ field }) => (
              <div>
                <label className="mb-1 block text-start text-sm font-medium text-gray-700">
                  Abstract *
                </label>
                <textarea
                  {...field}
                  dir="auto"
                  className={`w-full p-3 border ${
                    formErrors.abstract ? "border-red-500" : "border-gray-300"
                  } rounded-lg text-justify rtl:text-right rtl:placeholder:text-right focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  rows={6}
                  placeholder="Paste or type abstract here..."
                  onPaste={(e) => {
                    e.preventDefault();
                    let pasted = e.clipboardData.getData("text");

                    // 1. Remove multiple spaces/newlines
                    pasted = pasted
                      .replace(/\s+/g, " ")
                      .replace(/\n\s*\n/g, "\n")
                      .trim();

                    // 2. Capitalize first letter of sentences (optional)
                    pasted = pasted.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) =>
                      c.toUpperCase(),
                    );

                    field.onChange(pasted); // update form state
                  }}
                />
                {formErrors.abstract && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.abstract.message as string}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="authors"
            control={control}
            render={({ field }) => (
              <div>
                <label className="mb-1 block text-start text-sm font-medium text-gray-700">
                  Authors (comma-separated) *
                </label>
                <input
                  {...field}
                  type="text"
                  className={`w-full rounded-lg border p-3 rtl:text-right rtl:placeholder:text-right ${formErrors.authors ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter authors, e.g., John Doe, Jane Smith"
                  onChange={(e) => {
                    const cleanedValue = cleanAuthorsInput(e.target.value);
                    field.onChange(cleanedValue);
                  }}
                />
                {formErrors.authors && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.authors.message as string}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="keywords"
            control={control}
            render={({ field }) => (
              <div>
                <label className="mb-1 block text-start text-sm font-medium text-gray-700">
                  Keywords *
                </label>
                <input
                  {...field}
                  type="text"
                  className={`w-full rounded-lg border p-3 rtl:text-right rtl:placeholder:text-right ${formErrors.keywords ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter keywords"
                />
                {formErrors.keywords && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.keywords.message as string}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="doi"
            control={control}
            render={({ field }) => (
              <div>
                <label className="mb-1 block text-start text-sm font-medium text-gray-700">
                  DOI *
                </label>
                <input
                  {...field}
                  type="text"
                  className={`w-full rounded-lg border p-3 rtl:text-right rtl:placeholder:text-right ${formErrors.doi ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter DOI"
                />
                {formErrors.doi && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.doi.message as string}
                  </p>
                )}
              </div>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="startPage"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="mb-1 block text-start text-sm font-medium text-gray-700">
                    Start Page *
                  </label>
                  <input
                    {...field}
                    type="number"
                    min="1"
                    className={`w-full rounded-lg border p-3 rtl:text-right rtl:placeholder:text-right ${formErrors.startPage ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter start page"
                  />
                  {formErrors.startPage && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.startPage.message as string}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="endPage"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="mb-1 block text-start text-sm font-medium text-gray-700">
                    End Page *
                  </label>
                  <input
                    {...field}
                    type="number"
                    min="1"
                    className={`w-full rounded-lg border p-3 rtl:text-right rtl:placeholder:text-right ${formErrors.endPage ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter end page"
                  />
                  {formErrors.endPage && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.endPage.message as string}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          <Controller
            name="volume"
            control={control}
            render={({ field }) => (
              <div>
                <label className="mb-1 block text-start text-sm font-medium text-gray-700">
                  Volume *
                </label>
                <select
                  {...field}
                  className={`w-full rounded-lg border p-3 rtl:text-right ${formErrors.volume ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="" disabled>
                    Select a volume
                  </option>
                  {volumesList.map((volume) => (
                    <option key={volume.id} value={volume.id}>
                      {volume.name}
                    </option>
                  ))}
                </select>
                {formErrors.volume && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.volume.message as string}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="issue"
            control={control}
            render={({ field }) => (
              <div>
                <label className="mb-1 block text-start text-sm font-medium text-gray-700">
                  Issue *
                </label>
                <select
                  {...field}
                  className={`w-full rounded-lg border p-3 rtl:text-right ${formErrors.issue ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  disabled={!getValues("volume") || !issues.length}
                >
                  {issues.length ? (
                    issues.map((issue) => (
                      <option key={issue.id} value={issue.id}>
                        {issue.name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No issues available
                    </option>
                  )}
                </select>
                {formErrors.issue && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.issue.message as string}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="manuscriptLink"
            control={control}
            render={({ field }) => (
              <div>
                <label className="mb-1 block text-start text-sm font-medium text-gray-700">
                  Manuscript File URL *
                </label>
                <input
                  {...field}
                  type="text"
                  className={`w-full rounded-lg border p-3 rtl:text-right rtl:placeholder:text-right ${formErrors.manuscriptLink ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter manuscript file URL"
                />
                {formErrors.manuscriptLink && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.manuscriptLink.message as string}
                  </p>
                )}
              </div>
            )}
          />
          {fetchError && (
            <p className="text-red-500 text-center">{fetchError}</p>
          )}
          {submitError && (
            <p className="text-red-500 text-center">{submitError}</p>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={validateAndSubmit}
              disabled={isSubmitting}
              className={`flex items-center px-6 py-3 rounded-lg transition duration-300 ${
                isSubmitting
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-primary text-white hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting ...
                </>
              ) : (
                "Submit Publication"
              )}
            </button>
          </div>
        </div>
      </div>
  );
};

const PublishManuscript: React.FC = () => {
  const methods = useForm({
    defaultValues: {
      manuscriptId: "",
      title: "",
      abstract: "",
      authors: "",
      keywords: "",
      volume: "",
      issue: "",
      doi: "",
      startPage: "",
      endPage: "",
      manuscriptLink: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <PublishManuscriptInner />
    </FormProvider>
  );
};

export default PublishManuscript;
