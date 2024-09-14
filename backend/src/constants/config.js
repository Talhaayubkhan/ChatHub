export const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    "http://localhost:3000",
    process.env.CLIENT_URL,
  ],
  credentials: true,
};
