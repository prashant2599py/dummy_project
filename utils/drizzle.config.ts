import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.ts", // Ensure this path is correct
  out: "./drizzle",   
  dbCredentials: {
    url: "postgresql://neondb_owner:7EgmbWFDs6Bh@ep-wandering-paper-a5xjv9c9.us-east-2.aws.neon.tech/neondb?sslmode=require"
    
  } 
});
