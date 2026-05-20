import { getSession } from "next-auth/react";

export const getUserDetails = async () => {
  try {
    const session = await getSession();

    if (session && session.user) {
      return {
        name: session.user.name || "User",
        email: session.user.email || "Email",
        role: session.user.role || "Role",
      };
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
  return null;
};
