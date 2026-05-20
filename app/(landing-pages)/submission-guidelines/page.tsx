"use client";
import { motion } from "framer-motion";
import AuthorGuideline from "@/app/components/author-guideline";
import ManuscriptSubmission from "@/app/components/manuscript-submission";
import PublicationCharges from "@/app/components/publication-charges";
import IndexingReviewers from "@/app/components/indexing-reviewers";

export default function AboutUsPage() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section with Background */}
      <div
        className="relative h-[300px] md:h-[550px] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/submisson-guideline_bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.h1
          className="relative text-white text-4xl md:text-5xl font-bold z-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Submission Guidelines
        </motion.h1>
      </div>

      {/* Content Section (Outside Background) */}
      <div className="bg-white min-h-screen px-4 md:px-12 lg:px-24 ">
        <ManuscriptSubmission />
        <AuthorGuideline />
        <PublicationCharges />
        <IndexingReviewers />
      </div>
    </div>
  );
}
