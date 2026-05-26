"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "General Requirements",
    description:
      "Articles must be original, not published or submitted elsewhere, and must follow academic writing conventions.",
  },
  {
    title: "Abstract & Title Page",
    description:
      "Include an abstract not exceeding 200 words. The first page should contain title, author name, affiliation, department/unit, email, and phone number.",
  },
  {
    title: "Second Page",
    description:
      "The second page should display only the paper title without the author name(s).",
  },
  {
    title: "Language & Format",
    description:
      "Use Microsoft Word with Times New Roman size 12 for English or Traditional Arabic size 16 for Arabic, and double line spacing.",
  },
  {
    title: "Length",
    description: "Manuscripts should not exceed 15 pages of A4 paper size.",
  },
  {
    title: "References",
    description:
      "Citations should use APA or MLA style, and endnotes should be adopted for references.",
  },
  {
    title: "Submission Email",
    description:
      "Send a soft copy of the article intended for publication to makiyuabubakar@gmail.com or umaraa@slu.edu.ng.",
  },
  {
    title: "Responsibility",
    description:
      "Contributors are responsible for the opinions, views, or comments expressed in their articles.",
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
        <ol className="text-gray-700 border-s border-gray-200 sticky top-20 h-fit">
          {steps.map((step, index) => (
            <li
              key={index}
              className={`mb-10 ms-6 transition-all cursor-pointer ${
                activeStep === index ? "text-primary" : ""
              }`}
              onClick={() => handleStepClick(index)}
            >
              <span
                className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white ${
                  activeStep === index ? "bg-primary/20" : "bg-gray-100"
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

        <div className="flex-1">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              id={`step-${index}`}
              className="step-section p-4 bg-slate-100 mb-8 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: activeStep === index ? 1 : 0.6 }}
            >
              <h2 className="text-xl font-semibold">{step.title}</h2>
              <p className="text-slate-700 mt-2">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
