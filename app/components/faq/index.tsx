"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "How can I submit my research to SHADAI?",
    answer:
      "You can submit your research through our online submission portal",
  },
  {
    question: "What types of research does SHADAI accept?",
    answer:
      "We accept original research papers, review articles, and technical notes in various fields, including biochemistry, software engineering, environmental science, and more.",
  },
  {
    question: "Can I access previous issues of SHADAI?",
    answer:
      "Yes, previous issues of SHADAI are available on our website in the archives section.",
  },
  {
    question: "What is the peer review process for SHADAI?",
    answer:
      "All submissions undergo a double-blind peer review process to ensure quality and originality.",
  },
  {
    question: "How long does it take to review a submission?",
    answer:
      "The review process typically takes 4-6 weeks, depending on reviewer availability.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-5xl mx-auto py-8 sm:py-12 px-2 sm:px-4 lg:px-6">
      <h2 className="text-2xl font-bold text-center text-primary">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-gray-400 mt-2">
        We are here to help you with any questions you may have. If you
        don&apos;t find what you need, please contact us at{" "}
        <a
          href="mailto:support@example.com"
          className="text-primary-600 underline"
        >
          ame_jst@shadaijournal.com
        </a>
        .
      </p>

      <div className="mt-6 space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gray-100 rounded-lg shadow-sm">
            <button
              className="flex justify-between items-center w-full text-left p-4 text-black"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-semibold">{faq.question}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaChevronDown className="text-gray-700" />
              </motion.div>
            </button>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={
                openIndex === index
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="p-4 text-gray-700">{faq.answer}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
