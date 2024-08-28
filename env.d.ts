namespace NodeJS {
  export interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly PUBLIC_URL: string;
    readonly RESEND_API_KEY: string;
    readonly NEXT_PUBLIC_POSTHOG_KEY: string;
    readonly NEXT_PUBLIC_POSTHOG_HOST: string;
  }
}
