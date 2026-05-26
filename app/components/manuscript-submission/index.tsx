import { motion } from "framer-motion";
import Button from "../ui/button";

export default function ManuscriptSubmission() {
  return (
    <section className="py-12 my-12 px-6 md:px-16 lg:px-24 bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-3xl font-bold text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Manuscript Submission
        </motion.h1>
        <motion.p
          className="mt-4 text-lg leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Submit your article directly through the SHADAI Journal portal or send a soft copy to our editorial email addresses.
        </motion.p>
        <motion.p
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          Your manuscript should comply with our author guidelines, including an abstract not exceeding 200 words, first-page author details, and second-page title only.
        </motion.p>
        <motion.p
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1 }}
        >
          Soft copies should be sent to <strong>makiyuabubakar@gmail.com</strong> or <strong>umaraa@slu.edu.ng</strong>.
        </motion.p>
      </div>

      <div className="max-w-4xl mx-auto mt-8 p-6 shadow-2xl rounded-lg bg-white">
        <h2 className="text-2xl font-semibold text-primary-600">
          Key Submission Rules
        </h2>
        <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-700">
          <li>Articles must be original and not published or submitted elsewhere.</li>
          <li>Include an abstract of no more than 200 words at the beginning of the article.</li>
          <li>The first page must show the title, author name, affiliation, department/unit, email, and phone number.</li>
          <li>The second page should display only the paper title without author names.</li>
          <li>Manuscripts should be prepared in Microsoft Word using Times New Roman size 12 for English and Traditional Arabic size 16 for Arabic, with double line spacing.</li>
          <li>Articles must not exceed 15 pages on A4 paper.</li>
          <li>Use APA or MLA citation style, and include endnotes.</li>
          <li>Authors are responsible for the opinions and comments expressed in their work.</li>
        </ul>
      </div>

      <div className="text-center mt-8">
        <Button className="bg-primary text-white py-3 px-6 text-lg rounded-md hover:bg-primary-700">
          <a
            href="https://www.shadai.com.ng/submission/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Submit Your Manuscript
          </a>
        </Button>
      </div>
    </section>
  );
}
