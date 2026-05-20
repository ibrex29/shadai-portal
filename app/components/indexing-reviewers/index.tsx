"use client";
import { motion } from "framer-motion";
import { CheckCircle } from "@phosphor-icons/react";
import Image from "next/image";

export default function IndexingReviewers() {
  const indexings = [
    "/images/scholar_logo.png",
    "/images/ResearchGate_Logo.png",
    "/images/academia-logo.svg",
    "/images/crossref-logo.svg",
    "/images/shadai-logo.png",
  ];

  return (
    <section className=" py-12 px-6 md:px-16 lg:px-32">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-8"
      >
        {/* Indexing Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-primary text-center">
            Indexing
          </h2>
          <p className="text-gray-700 mt-2 text-center">
            SHADAI is currently indexed in the following databases:
          </p>

          <div className="mt-6 items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {indexings.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center flex-col gap-3 bg-blue-100 p-4 rounded-md"
              >
                <Image src={item} alt={item} width={150} height={30} />
                <CheckCircle className="text-blue-600 w-6 h-6" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Suggested Reviewers Section */}
        <div>
          <h2 className="text-xl font-bold text-primary text-center">
            Suggested Reviewers
          </h2>
          <p className="text-gray-700 mt-2 text-center">
            Authors should suggest at least three potential reviewers with their
            institutional affiliations and email addresses. However, the
            Managing Editor has the final decision on reviewer selection.
          </p>

          <div className="mt-6 bg-gray-50 p-6 rounded-md text-center">
            <p className="text-gray-700">
              Your suggested reviewers help us expand our database and ensure
              diverse expertise in manuscript evaluation.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
