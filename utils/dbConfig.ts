import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Correct connection string for Neon
const sql = neon('postgresql://neondb_owner:7EgmbWFDs6Bh@ep-wandering-paper-a5xjv9c9.us-east-2.aws.neon.tech/neondb?sslmode=require');
const db = drizzle(sql, { schema });

export { db };
        