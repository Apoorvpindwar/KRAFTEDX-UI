"use client";

import { UserButton as ClerkUserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";

export function UserButton() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <ClerkUserButton
      appearance={{
        baseTheme: isDark ? "dark" : "light",
        elements: {
          userButtonBox: "ml-2",
          userButtonAvatarBox: "w-10 h-10",
        }
      }}
      afterSignOutUrl="/"
    />
  );
}
