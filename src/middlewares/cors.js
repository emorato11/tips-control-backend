import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:1234",
  "https://tips-control-frontend.vercel.app",
];

export const corsMiddleware = cors({
  origin: ACCEPTED_ORIGINS, // Permitir múltiples orígenes
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "X-CSRF-Token",
    "X-Requested-With",
    "Accept",
    "Accept-Version",
    "Content-Length",
    "Content-MD5",
    "Content-Type",
    "Date",
    "X-Api-Version",
    "Authorization",
    "Access-Control-Allow-Origin",
  ],
  credentials: true, // Necesario para enviar cookies/tokens
});
