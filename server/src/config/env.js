import dotenv from 'dotenv';
dotenv.config();

const required = [ 'JWT_SECRET'];
required.forEach((key) => {
  if (!process.env[key]) throw new Error(`Missing required env var: ${key}`);
});

export const port = process.env.PORT || 5000;
export const jwtSecret = process.env.JWT_SECRET;
export const jwtExpiresIn = '8h';