"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Preparation of the Manuscript",
    description: "Ensure the manuscript follows formatting guidelines.",
  },
  {
    title: "Title Page",
    description: "Include article title, authors, and contact details.",
  },
  {
    title: "Abstract Page",
    description: "Provide an abstract of up to 250 words with keywords.",
  },
  { title: "Keywords", description: "Include five or six relevant keywords." },
  {
    title: "Symbols, Abbreviations and Units",
    description: "Define all symbols and abbreviations.",
  },
  {
    title: "Introduction",
    description: "Provide background, literature review, and objectives.",
  },
  {
    title: "Theoretical Analysis",
    description: "Explain mathematical principles or theories used.",
  },
  {
    title: "Materials and Methods",
    description: "Describe apparatus, materials, and methodologies used.",
  },
  {
    title: "Results and Discussion",
    description: "Interpret findings with tables and figures as needed.",
  },
  {
    title: "Conclusion",
    description: "Summarize findings, relevance, and recommendations.",
  },
  {
    title: "References",
    description: "Follow the APA system for citations and references.",
  },
];

export default function AuthorGuideline() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".step-section");
      let index = 0;
      sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          index = i;
        }
      });
      setActiveStep(index);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStepClick = (index: number) => {
    const section = document.getElementById(`step-${index}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="flex flex-col items-center">
      <div>
        <h1 className="text-3xl text-primary font-semibold text-center">
          Author Guidelines
        </h1>
      </div>
      <div className="flex gap-4 max-w-4xl justify-center mt-8">
        {/* Stepper Navigation */}
        <ol className="text-gray-700 border-s border-gray-200 sticky top-20 h-fit">
          {steps.map((step, index) => (
            <li
              key={index}
              className={`mb-10 ms-6 transition-all cursor-pointer ${
                activeStep === index ? "text-green-500" : ""
              }`}
              onClick={() => handleStepClick(index)}
            >
              <span
                className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white ${
                  activeStep === index ? "bg-green-200" : "bg-gray-100"
                }`}
              >
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
              </span>
              <h3 className="font-medium leading-tight">{step.title}</h3>
              <p className="text-sm">{step.description}</p>
            </li>
          ))}
        </ol>

        {/* Step Sections */}
        <div className="flex-1">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              id={`step-${index}`}
              className="step-section p-4 bg-green-200 mb-8 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: activeStep === index ? 1 : 0.6 }}
            >
              <h2 className="text-xl font-semibold">{step.title}</h2>
              <p className="text-black mt-2">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
