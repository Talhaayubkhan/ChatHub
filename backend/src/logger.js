// import winston from "winston";

// // create a winston logger
// const logger = winston.createLogger({
//   level: "info",
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json()
//   ),
//   transports: [
//     new winston.transports.File({ filename: "error.log", level: "error" }),
//     new winston.transports.Console(),
//   ],
// });

// export { logger };

import winston from "winston";

// Create a Winston logger
const logger = winston.createLogger({
  level: "info", // Default log level
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp to logs
    winston.format.errors({ stack: true }), // Include stack trace for errors
    winston.format.json() // Log format in JSON
  ),
  transports: [
    // File transport for error logs
    new winston.transports.File({ filename: "error.log", level: "error" }),

    // Console transport for all levels
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Colorize console output for better readability
        winston.format.simple() // Simple format for console output
      ),
    }),
  ],
});

export { logger };
