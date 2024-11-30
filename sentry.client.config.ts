import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://486159a4e523be9a0a20f1c1187029b3@o4508319955353600.ingest.us.sentry.io/4508381392666624",

  integrations: [
    Sentry.replayIntegration(),
  ],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});