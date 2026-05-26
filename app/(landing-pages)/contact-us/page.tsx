"use client";

import { motion } from "framer-motion";
import { Envelope, Phone, Globe } from "@phosphor-icons/react";

const contacts = [
  {
    title: "Journal Secretariat",
    name: "SHADAI Journal of Contemporary Research in Humanities",
    department: "Faculty of Humanities",
    role: "Sule Lamido University Kafin Hausa",
    institution: "PMB 048 Kafin Hausa, Jigawa State, Nigeria",
    phone: "+234 703 208 6833",
    email: "makiyuabubakar@gmail.com",
    website: "www.slu.edu.ng",
  },
  {
    title: "Editorial Office",
    name: "Dr. Makiyu Abubakar Danyaya",
    department: "Faculty of Humanities",
    role: "Editorial Secretary",
    institution: "Sule Lamido University Kafin Hausa",
    phone: "+234 803 865 2918",
    email: "umaraa@slu.edu.ng",
    website: "www.slu.edu.ng",
  },
  {
    title: "Additional Contacts",
    members: [
      { name: "+234 706 657 4733" },
      { name: "+234 803 227 4436" },
      { name: "+234 701 407 1446" },
      { name: "+234 803 237 7941" },
    ],
    email: "makiyuabubakar@gmail.com",
  },
];

export default function ContactUsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 md:px-12 lg:px-24">
      <div
        className="relative h-[300px] md:h-[350px] flex flex-col gap-2 mb-12 items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/shadai_background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.h1
          className="relative text-white text-4xl md:text-5xl font-bold z-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact SHADAI Journal
        </motion.h1>
        <p className="relative z-10 max-w-2xl text-gray-200 mt-4">
          Reach the Faculty of Humanities journal office for submissions, editorial correspondence, and publication inquiries.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {contact.title}
            </h3>
            {contact.members ? (
              <div>
                {contact.members.map((member, i) => (
                  <p key={i} className="mb-3 text-gray-700">
                    {member.name}
                  </p>
                ))}
                <p className="text-gray-600 flex items-center gap-2">
                  <Envelope size={16} /> {contact.email}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-gray-900 font-medium">{contact.name}</p>
                <p className="text-gray-600">{contact.department}</p>
                <p className="text-gray-600">{contact.role}</p>
                <p className="text-gray-600">{contact.institution}</p>
                <div className="mt-4 space-y-2">
                  <p className="flex items-center gap-2">
                    <Phone size={16} /> {contact.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Envelope size={16} /> {contact.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Globe size={16} />
                    <a
                      href={`https://${contact.website}`}
                      className="text-blue-600 underline"
                    >
                      {contact.website}
                    </a>
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
