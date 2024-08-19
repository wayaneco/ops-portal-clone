 const BASE_URL = process.env['NEXT_PUBLIC_APP_BASE_URL'] ? 
      process.env['NEXT_PUBLIC_APP_BASE_URL'] : 
      'http://localhost:3000' ;
const SUPABASE_URL: string = process.env["NEXT_PUBLIC_SUPABASE_URL"]
  ? process.env["NEXT_PUBLIC_SUPABASE_URL"]
  : "";
  
const SUPABASE_SERVICE_ROLE_KEY: string = process.env[
  "NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY"
]
  ? process.env["NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY"]
  : "";

const DEFAULT_PASSWORD = 'r9S+ClRu-lwech&s?ewI';

export {
    BASE_URL,
    DEFAULT_PASSWORD,
    SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_URL,
}