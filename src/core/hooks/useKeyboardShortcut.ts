"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/clerk-react";

const useKeyboardShortcut = () => {
  const router = useRouter();
  const { signOut, openSignIn } = useClerk();

  const handleLogin = useCallback(() => {
    console.log("Logging in...");
    openSignIn();
  }, [openSignIn]);

  const handleLogout = useCallback(() => {
    console.log("Logging out...");
    signOut(() => router.push("/"));
  }, [signOut, router]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if Ctrl (Windows/Linux) or Cmd (Mac) is pressed
      const modifierKey = event.ctrlKey || event.metaKey;

      if (modifierKey && event.key === "l") {
        event.preventDefault();
        handleLogin();
      } else if (modifierKey && event.key === "o") {
        event.preventDefault();
        handleLogout();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleLogin, handleLogout]);

  return { handleLogin, handleLogout };
};

export default useKeyboardShortcut;
