"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { getRecentIssues } from "@/app/api/(landing-page)/manuscript";
import { Issue } from "@/types";

export default function SpecialIssuesCarousel() {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await getRecentIssues(5);
        setIssues(response); // Directly set the response to the state
      } catch (error) {
        console.error("Error fetching recent issues:", error);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="w-full max-w-5xl px-0 sm:px-2 py-2 mx-auto bg-gray-100">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="bg-white flex justify-center items-center"
      >
        {issues?.length > 0 ? (
          issues.map((issue) => (
            <SwiperSlide
              key={issue.id}
              className="p-4 flex justify-center w-full flex-col items-center"
            >
              <div className="flex justify-center items-center">
                <Image
                  src="/images/manuscript_cover.png"
                  alt={issue.name}
                  width={100}
                  height={150}
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-base font-semibold">{issue.name}</h3>
                <p className="text-sm text-gray-600">
                  Volume: {issue.Volume?.name || "N/A"}
                </p>
                <p className="text-xs text-gray-500">
                  Published: {new Date(issue.createdAt).toLocaleDateString()}
                </p>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div className="flex"></div>
        )}
      </Swiper>
    </div>
  );
}
