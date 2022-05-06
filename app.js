const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const chalk = require("chalk");
const cors = require("cors");

const mongodbConnect = require("./config/db")

// import * as Sentry from "@sentry/node";
// import * as Tracing from "@sentry/tracing";

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
require("dotenv").config();

/**
 * Create Express server.
 */
var app = express();

// Sentry.init({
//   dsn: process.env.SENTRY_URL,
//   tracesSampleRate: 1.0,
//   attachStacktrace: true,
//   debug: true,
//   integrations: [
//     // enable HTTP calls tracing
//     new Sentry.Integrations.Http({ tracing: true }),
//     // enable Express.js middleware tracing
//     new Tracing.Integrations.Express({ app }),
//   ],
// });

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
// app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
// app.use(Sentry.Handlers.tracingHandler());

// The error handler must be before any other error middleware and after all controllers
// app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
// app.use(function onError(err, req, res, next) {
//   // The error id is attached to `res.sentry` to be returned
//   // and optionally displayed to the user for support.
//   res.statusCode = 500;
//   res.end(res.sentry + "\n");
// });

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Connect to the MongoDB database...
mongodbConnect()

app.use(cors());
//console.log('Setting up Sentry Error reporting');
//app.use(raven.errorHandler());

const apiRoutes = require("./routes");

app.use("/api", apiRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("No endpoint defined.")
})

/**
 * Start Express server.
 */
app.listen(3004, () => {
  console.log(
    chalk.green("✓"),
    " App is running at ",
    chalk.green("http://localhost:3004")
  );
  console.log("  Press CTRL-C to stop\n");
});
