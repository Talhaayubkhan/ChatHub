const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

export const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

export { allowedOrigins };
