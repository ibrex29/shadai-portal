import { baseUrl } from "@/constants/config";
import { getJournalSubdomain } from "@/utils/request";
import { getSession, signOut } from "next-auth/react";

export const logout = async () => {
  try {
    const session = await getSession();
    if (session?.token) {
      const response = await fetch(`${baseUrl}/v1/auth/logout`, {
        method: "POST",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${session.token}`,
          "x-journal-subdomain": getJournalSubdomain(),
        },
      });
      if (!response.ok) {
        console.error("Custom logout API failed.");
      }
    }

    // Now, log out using next-auth
    await signOut({ redirect: false }); // Don't redirect automatically, we handle that manually
  } catch (error) {
    console.error("Error during logout:", error);
  } finally {
    window.location.href = "/signin";
  }
};
