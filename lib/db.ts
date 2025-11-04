// lib/db.ts
import { Pool, QueryResult, QueryResultRow } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL2,
});

export default pool;

// Reusable helper for parameterized queries
// ✅ Make the function generic
export async function runQuery<T extends QueryResultRow = any>(
  query: string,
  params: any[] = []
): Promise<QueryResult<T>> {
  const client = await pool.connect();
  try {
    const result = await client.query<T>(query, params);
    return result;
  } catch (error) {
    console.error("DB Query Error:", error);
    throw error;
  } finally {
    client.release();
  }
}
/* export async function runQuery(query: string, params: any[] = []) {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result;
  } catch (error) {
    console.error("DB Query Error:", error);
    throw error;
  } finally {
    client.release();
  }
} */

/* export async function runQuery2<T = any>(
  query: string,
  params: any[] = []
): Promise<QueryResult<T>> {
  const client = await pool.connect();
  try {
    const result = await client.query<T>(query, params);
    return result;
  } catch (error) {
    console.error("DB Query Error:", error);
    throw error;
  } finally {
    client.release();
  }
} */
