// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://7b6bb016957f90d59acafbcfd4d53179@o4510652727230464.ingest.us.sentry.io/4510652730376192",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations: [Sentry.mongooseIntegration()],
});
