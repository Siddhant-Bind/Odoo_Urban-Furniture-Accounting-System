import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/env.js";
export default function requireAuth(req, _res, next) {
  const token = req.headers.authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token)
    return next(
      Object.assign(new Error("Authentication is required"), {
        statusCode: 401,
      }),
    );
  try {
    req.user = jwt.verify(token, jwtSecret);
    return next();
  } catch {
    return next(
      Object.assign(new Error("Invalid or expired token"), { statusCode: 401 }),
    );
  }
}
