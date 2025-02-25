import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://localhost:8080",
  "http://localhost:1234",
  // 'http://localhost:5173'
];

export const corsMiddleware = () => {
  return cors({
    origin: "https://tips-control-frontend.vercel.app", // prod
    // origin: "http://localhost:3000", // local
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
};

// export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
//   cors();
