"use client";

import React from "react";
import Image from "next/image";
import Button from "../ui/button";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetManuscriptByIdResponse } from "@/types";
import {
  getPublishedManuscriptById,
  updateDownloadCount,
} from "@/app/api/(landing-page)/manuscript";
import { containsArabic } from "@/lib/text-direction";

const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="h-6 w-32 bg-gray-300 rounded mb-2" />
    <div className="h-4 w-48 bg-gray-300 rounded mb-4" />
    <div className="h-6 w-2/3 bg-gray-300 rounded mb-2" />
    <div className="h-4 w-1/2 bg-gray-300 rounded mb-4" />
    <div className="h-24 w-full bg-gray-300 rounded mb-4" />
  </div>
);

const SkeletonImageLoader = () => (
  <div className="hidden md:block animate-pulse">
    <div className="h-48 w-48 bg-gray-300 rounded-lg" />
    <div className="mt-4 h-10 w-48 bg-gray-300 rounded" />
    <div className="mt-2 h-10 w-48 bg-gray-300 rounded" />
  </div>
);

const ManuscriptDetails = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const queryClient = useQueryClient();

  // Fetch manuscript details
  const { data: manuscript, isLoading } = useQuery<GetManuscriptByIdResponse>({
    queryKey: ["manuscript", id],
    queryFn: async () => {
      const response = await getPublishedManuscriptById(id);
      return response;
    },
    enabled: !!id,
  });

  // Mutation to update download count
  const { mutate: incrementDownload } = useMutation({
    mutationFn: () => updateDownloadCount(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["manuscript", id] });
    },
  });

  const isArabicAbstract = containsArabic(manuscript?.abstract);

  return (
    <div className="max-w-6xl mx-auto  md:p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <>
              <h2 className="text-xl font-semibold mt-4">
                {manuscript?.title}
              </h2>
              <p className="text-primary font-medium mt-1">
                By{" "}
                {Array.isArray(manuscript?.Authors)
                  ? manuscript.Authors.join(", ")
                  : ""}
              </p>

              <div className="mt-6 border-t-2 pt-4">
                <h3 className="text-lg font-semibold">Abstract</h3>
                <p
                  className={`mt-2 text-gray-700 leading-relaxed ${isArabicAbstract ? "font-arabic text-end" : "text-justify"}`}
                  dir={isArabicAbstract ? "rtl" : "ltr"}
                  lang={isArabicAbstract ? "ar" : "en"}
                >
                  {manuscript?.abstract}
                </p>
              </div>

              <div className="mt-6 border-t-2 pt-4 flex justify-between items-center">
                <p className="text-sm italic">
                  Citation:{" "}
                  {Array.isArray(manuscript?.Authors)
                    ? manuscript.Authors.join(", ")
                    : ""}
                  , &quot;{manuscript?.title},&quot;.
                </p>
              </div>
            </>
          )}
        </div>

        <div>
          {isLoading ? (
            <SkeletonImageLoader />
          ) : (
            <div className="flex w-fit flex-col gap-2 items-center">
              <Image
                src="/images/manuscript_cover.png"
                alt="Manuscript Cover"
                width={200}
                height={200}
                className="rounded-lg"
              />
              <div className="w-full">
                <a
                  href={manuscript?.formattedManuscript}
                  download
                  className="block w-full"
                  onClick={() => incrementDownload()} // Call API on download click
                >
                  <Button outlined className="w-full text-sm whitespace-nowrap">
                    Download Manuscript
                  </Button>
                </a>
              </div>
              <div className="w-full">
                <Button
                  outlined
                  className="w-full text-sm whitespace-nowrap"
                  onClick={() =>
                    router.push(`${manuscript?.formattedManuscript}`)
                  }
                >
                  View Manuscript
                </Button>
              </div>

              <div className="flex w-full justify-center mt-2">
                <span className="text-blue-600 mt-2 md:mt-0">
                  Downloads: {manuscript?.downloadTimes}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManuscriptDetails;
