// lib/db.js
import { Pool } from "pg";

if (
  !process.env.PG_HOST ||
  !process.env.PG_USER ||
  !process.env.PG_PASSWORD ||
  !process.env.PG_DATABASE
) {
  throw new Error(
    "Please define all PostgreSQL environment variables in .env.local"
  );
}

const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: Number(process.env.PG_PORT) || 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;
