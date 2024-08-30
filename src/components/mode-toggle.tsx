"use client";

import { MoonIcon, SunIcon } from "@/icons";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { flushSync } from "react-dom";

export const ModeToggle = () => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { theme, setTheme } = useTheme();
  const handleThemeSwitch = async () => {
    if (!document.startViewTransition) {
      setTheme(theme === "dark" ? "light" : "dark");
      return;
    }

    if (!ref.current) return;
    await document.startViewTransition?.(() =>
      flushSync(() => setTheme(theme === "dark" ? "light" : "dark")),
    ).ready;

    const { top, left } = ref.current.getBoundingClientRect();
    const x = left;
    const y = top;

    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${radius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };
  return (
    <button
      ref={ref}
      type="button"
      className="px-2"
      onClick={handleThemeSwitch}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] text-neutral-800 dark:hidden dark:text-neutral-200" />
      <MoonIcon className="hidden h-[1.2rem] w-[1.2rem] text-neutral-800 dark:block dark:text-neutral-200" />
    </button>
  );
};
