import { ROLE_COMPANY_ADMIN, ROLE_NETWORK_ADMIN, ROLE_AGENT } from "./roles";
import { STATUS_COMPLETED, STATUS_IN_PROGRESS } from "./status";

export type STATUS_PROVISION = "pending" | "completed";

const BASE_URL = process.env["NEXT_PUBLIC_SUPABASE_URL"]
  ? process.env["NEXT_PUBLIC_SUPABASE_URL"]
  : "http://localhost:3000";
const SUPABASE_URL: string = process.env["NEXT_PUBLIC_SUPABASE_URL"]
  ? process.env["NEXT_PUBLIC_SUPABASE_URL"]
  : "";

const SUPABASE_SERVICE_ROLE_KEY: string = process.env[
  "NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY"
]
  ? process.env["NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY"]
  : "";

const DEFAULT_PASSWORD = "r9S+ClRu-lwech&s?ewI";

const NEXT_PUBLIC_GOOGLE_MAP_API: string = process.env[
  "NEXT_PUBLIC_GOOGLE_MAP_API"
]
  ? process.env["NEXT_PUBLIC_GOOGLE_MAP_API"]
  : "";

export {
  BASE_URL,
  DEFAULT_PASSWORD,
  NEXT_PUBLIC_GOOGLE_MAP_API,
  ROLE_COMPANY_ADMIN,
  ROLE_NETWORK_ADMIN,
  ROLE_AGENT,
  SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_URL,
  STATUS_COMPLETED,
  STATUS_IN_PROGRESS,
};
