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
          className="mt-4 text-lg  leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Manuscript submissions are received through our online submission
          platform:
          <a
            href="https://www.shadai.com.ng/submission/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 font-medium hover:underline"
          >
            https://www.shadai.com.ng/submission/
          </a>
          .
        </motion.p>
        <motion.p
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          New authors must register before submitting, while existing users can
          log in to proceed. See our{" "}
          <span className="font-medium">sample paper format</span> and{" "}
          <span className="font-medium">author’s guide</span> for manuscript
          preparation. The journal template is available for download on our
          website under <span className="font-medium">Manuscript Template</span>
          .
        </motion.p>
        <motion.p
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1 }}
        >
          Please refer to our information pack for additional guidance on using
          the journal portal.
        </motion.p>
      </div>

      <div
        className="max-w-4xl mx-auto mt-8 p-6 shadow-2xl rounded-lg"
        style={{ backgroundImage: "url('/images/paper_bg.jpg')" }}
      >
        <h2 className="text-2xl font-semibold text-primary-600">
          Submission Guidelines
        </h2>
        <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-700">
          <li>
            Submissions must be original and not published or under review
            elsewhere.
          </li>
          <li>All manuscripts undergo double-blind peer review.</li>
          <li>
            If accepted, they will be published in the next available issue.
          </li>
          <li>
            Accepted manuscripts will be categorized as research papers, review
            papers, or technical notes.
          </li>
          <li>
            Evaluation is based on methodological soundness, innovation,
            significance, and reporting quality.
          </li>
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
