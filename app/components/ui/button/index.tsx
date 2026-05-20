import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  outlined?: boolean;
}

export default function Button({
  children,
  onClick,
  className = "",
  type = "button",
  outlined = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition duration-300 ${
        outlined
          ? "bg-transparent border-[2px] border-primary text-primary hover:bg-primary hover:text-white"
          : "bg-primary text-white hover:bg-accent"
      } ${className}`}
    >
      {children}
    </button>
  );
}
