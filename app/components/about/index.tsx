"use client";
import { VscCoverage } from "react-icons/vsc";

import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <section className="container max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-2 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
      {/* Left Section - About SHADAI with Background Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden shadow-lg rounded-2xl p-6 border-l-4 border-primary-600 bg-gray-800 text-white"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/images/shadai_background.jpg')" }}
        ></div>

        {/* Content (Overlay to Keep Readable) */}
        <div className="relative z-10">
          <h2 className="text-lg font-bold  mb-4">About SHADAI</h2>
          <p className="leading-relaxed">
            The SHADAI Journal of Science and Technology
            (SHADAI) is a peer-reviewed, open-access journal dedicated to
            publishing high-quality research in science and technology.
            Published bi-annually, it provides a platform for interdisciplinary
            studies and groundbreaking discoveries that advance knowledge in
            various fields.
          </p>
        </div>
      </motion.div>

      {/* Right Section - Areas of Research with Background Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden shadow-lg rounded-2xl p-6 text-white"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{ backgroundImage: "url('/images/blue_bg.jpg')" }}
        ></div>

        {/* Content (Overlay to Keep Readable) */}
        <div className="relative z-10">
          <h2 className="text-lg font-bold mb-4">Areas of Research</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Chemistry",
              "Earth and Atmospheric Sciences",
              "Physics",
              "Biology",
              "Agriculture",
              "Computer Science",
              "Mathematics",
              "Materials Science",
              "Mechanics",
              "Statistics",
              "Software Engineering",
              "Applied Sciences  ...",
            ].map((item, index) => (
              <motion.li
                key={index}
                className="flex items-center space-x-2  text-white p-1 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <VscCoverage className="text-primary-600 text-lg" />
                <span className="text-sm">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
