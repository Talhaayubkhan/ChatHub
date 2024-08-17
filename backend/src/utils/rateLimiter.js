import { rateLimit } from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 150, // limit each IP to 100 requests per windowMs
  delayMs: 0, // disable delaying - full rate limit will be enforced
  message: "Too many login attempts, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

const registerLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 150, // limit each IP to 100 requests per windowMs
  delayMs: 0, // disable delaying - full rate limit will be enforced
  message: "Too many registration attempts, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

export { loginLimiter, registerLimiter };
