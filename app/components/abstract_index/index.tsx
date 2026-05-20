"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const AbstractIndexing = () => {
  return (
    <section className="py-8 sm:py-12 px-2 sm:px-4 w-full flex justify-center items-center">
      <div className="max-w-5xl w-full">
        <h2 className="text-2xl mb-8 font-bold text-center text-primary">
          Abstract & Indexing
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 items-center justify-items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/images/ResearchGate_Logo.png"
              alt="ResearchGate"
              width={120}
              height={40}
              className="object-contain"
            />
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/images/academia-logo.svg"
              alt="Academia.edu"
              width={150}
              height={50}
              className="object-contain"
            />
          </motion.div>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/images/scholar_logo.png"
              alt="Google Scholar"
              width={150}
              height={40}
              className="object-contain"
            />
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/images/crossref-logo.svg"
              alt="Scilit"
              width={100}
              height={40}
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AbstractIndexing;
