// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || "https://17118f78006ad472132176588ccf3f27@o4509753626001408.ingest.us.sentry.io/4509753695469568",

  // Add optional integrations for additional features
  integrations: [Sentry.replayIntegration()],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || "1.0"),
  
  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: parseFloat(process.env.SENTRY_REPLAYS_SESSION_SAMPLE_RATE || "0.1"),

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: parseFloat(process.env.SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE || "1.0"),

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: process.env.NODE_ENV === "development",

  // Add environment detection
  environment: process.env.NODE_ENV || "development",

  // Add release information
  release: process.env.VERCEL_GIT_COMMIT_SHA || "development",
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
