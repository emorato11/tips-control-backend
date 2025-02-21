import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Acceso no autorizado" });

  jwt.verify(token, "jwt", (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token inválido" });

    req.userId = decoded.userId; // Guardamos el ID del usuario en la request
    next();
  });
};
