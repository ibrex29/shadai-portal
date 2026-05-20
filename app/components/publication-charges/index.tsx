"use client";
import { motion } from "framer-motion";
import Button from "../ui/button";

export default function PublicationCharges() {
  return (
    <section className="bg-gray-100 my-8 py-12 px-6 md:px-16 lg:px-32">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-8"
      >
        <h2 className="text-3xl font-bold text-primary text-center">
          Publication Charges
        </h2>
        <p className="text-gray-700 mt-2 text-center">
          Below are the charges for article processing and publication.
        </p>

        {/* Charges Information */}
        <div className="mt-6 space-y-4">
          <div className="bg-green-100 p-4 rounded-md">
            <h3 className="text-xl font-semibold text-green-800">
              Article Processing Fee
            </h3>
            <p className="text-gray-700">
              ₦4,000.00 (To be paid during submission)
            </p>
          </div>

          <div className="bg-blue-100 p-4 rounded-md">
            <h3 className="text-xl font-semibold text-blue-800">
              Publication Fee
            </h3>
            <p className="text-gray-700">
              ₦10,000.00 (To be paid upon acceptance)
            </p>
          </div>
        </div>

        {/* Payment Details */}
        <div className="mt-8 bg-gray-50 p-6 rounded-md">
          <h3 className="text-2xl font-bold text-gray-800">Payment Details</h3>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>
              <span className="font-semibold">Account Name:</span> SHADAI Journal
              of Science and Technology
            </li>
            <li>
              <span className="font-semibold">Bank Name:</span> JAIZ Bank Plc
            </li>
            <li>
              <span className="font-semibold">Account Number:</span> 0014798508
            </li>
          </ul>
        </div>

        {/* Upload Instructions */}
        <div className="mt-6">
          <p className="text-gray-700 mx-3">
            A scanned copy of the teller should be uploaded as a supplementary
            file along with the manuscript in the author&apos;s portal or sent
            via email.
            <span className="bg-yellow-300 mx-1 p-1 px-4 text-xs rounded-full">
              {" "}
              <a
                href="mailto:me_jst@shadaijournal.com"
                className="text-primary-600 font-semibold hover:underline"
              >
                me_jst@shadaijournal.com
              </a>
            </span>
            <span className="bg-green-300 mx-1 p-1 px-4 text-xs rounded-full">
              <a
                href="mailto:bus_jst@shadaijournal.com"
                className="text-primary-600 font-semibold hover:underline"
              >
                bus_jst@shadaijournal.com
              </a>
            </span>
            <span className="bg-blue-200 mx-1 p-1 px-4 text-xs rounded-full">
              {" "}
              <a
                href="mailto:tea_jst@shadaijournal.com"
                className="text-primary-600 font-semibold hover:underline"
              >
                tea_jst@shadaijournal.com
              </a>
            </span>
          </p>

          <div className="mt-4 flex flex-col md:flex-row items-center gap-4"></div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
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
      </motion.div>
    </section>
  );
}
