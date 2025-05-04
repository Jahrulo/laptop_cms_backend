/* eslint-disable no-undef */
import { config } from "dotenv";

// Load `.env.dev.local` or `.env.prod.local` based on NODE_ENV
const environment = process.env.NODE_ENV;

config({
  path: `.env.${environment}.local`,
});

export const {
  PORT,
  NODE_ENV,
  DATABASE_URL,
  JWT_SECRET,
  JWT_EXPIRATION,
  ALLOWED_ORIGINS,
  ARCJET_ENV,
  ARCJET_KEY,
} = process.env;
