"use client";
import posthog from "posthog-js";
import { PostHogProvider as Provider } from "posthog-js/react";
import type { PropsWithChildren } from "react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: "always",
  });
}

export const PostHogProvider = ({ children }: PropsWithChildren) => {
  return <Provider client={posthog}>{children}</Provider>;
};
