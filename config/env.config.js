/* eslint-disable no-undef */
import { config } from "dotenv";

// Load `.env.dev.local` or `.env.prod.local` based on NODE_ENV
const environment = process.env.NODE_ENV || "dev";

config({
  path: `.env.${environment}.local`,
});

export const { PORT, NODE_ENV } = process.env;

