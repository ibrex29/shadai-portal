"use client";

import { motion } from "framer-motion";
import { Avatar } from "@mui/material";
import { Envelope, Phone, Globe } from "@phosphor-icons/react";

const contacts = [
  {
    title: "PRINCIPAL CONTACT",
    name: "Prof. Nasir Faruk",
    department: "Department of Information Technology",
    role: "Managing Editor",
    institution: "SHADAI Kafin Hausa, Jigawa State, Nigeria",
    phone: "+234 8032428141",
    email: "me_jst@shadaijournal.com",
    website: "www.shadai.com.ng",
  },
  {
    title: "SUPPORT CONTACT",
    name: "Dr. Salisu Garba",
    department: "Department of Software Engineering",
    role: "Assistant Managing Editor",
    institution: "SHADAI Kafin Hausa, Jigawa State, Nigeria",
    phone: "+234 8034990732",
    email: "ame_jst@shadaijournal.com",
    website: "www.shadai.com.ng",
  },
  {
    title: "TECHNICAL EDITORIAL ASSISTANTS (TEA)",
    name: "Technical Team",
    members: [
      { name: "Mr. Emmanuel Alozie", phone: "+234 816 176 9870" },
      { name: "Miss Anjolaoluwa Babatunde", phone: "+234 813 691 9839" },
      { name: "Miss Olagunju Hawau", phone: "+234 810 121 8417" },
    ],
    email: "tea_jst@shadaijournal.com",
  },
];

export default function ContactUsPage() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <div
        className="relative h-[300px] md:h-[350px] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/aboutus_bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.h1
          className="relative text-white text-4xl md:text-5xl font-bold z-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h1>
      </div>

      {/* Contact Section */}
      <div className="bg-white min-h-screen px-4 md:px-12 lg:px-24 py-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact, index) => (
          <motion.div
            key={index}
            className=" bg-white shadow-lg max-h-[450px] rounded-2xl border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="flex bg-primary p-2 rounded-t-2xl justify-center">
              <h3 className="text-base text-center font-semibold text-white mb-2">
                {contact.title}
              </h3>
            </div>
            {contact.members ? (
              <div className="p-4 justify-center text-center">
                {contact.members.map((member, i) => (
                  <div key={i} className="mb-4">
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-gray-600 flex justify-center text-center items-center gap-2">
                      <Phone size={16} /> {member.phone}
                    </p>
                  </div>
                ))}
                <p className="text-gray-600 text-center justify-center flex items-center gap-2">
                  <Envelope size={16} /> {contact.email}
                </p>
              </div>
            ) : (
              <div className="flex items-center flex-col text-center p-4 ">
                <Avatar
                  sx={{
                    width: 128,
                    height: 128,
                    fontSize: 48,
                    bgcolor: "#ccc",
                  }}
                />
                <p className="text-gray-900 mt-2 font-medium">{contact.name}</p>
                <p className="text-gray-600">{contact.department}</p>
                <p className="text-gray-600">{contact.role}</p>
                <p className="text-gray-600">{contact.institution}</p>
                <div className="mt-3 text-gray-700 space-y-2">
                  <p className="flex items-center gap-2">
                    <Phone size={16} /> {contact.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Envelope size={16} /> {contact.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Globe size={16} />{" "}
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
