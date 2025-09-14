import { Pool } from "pg";

let pool: Pool | null = null;

// export function getPool() {
//     let pool;
//     try {
//         pool = new Pool({
//             host: "127.0.0.1",
//             port: 5432,
//             user: "postgres",
//             password: "newpassword",
//             database: "postgres",
//         });

//     } catch (e) {
//         throw (e);
//     }
//     if (pool) {
//         return pool;
//     } else { return null; }
// }

export function getPool(): Pool {
    if (!pool) {
      pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false, // required for Render Postgres
        },
      });
    }
    return pool;
  }

export async function executeQuery({ query, values }: { query: string, values: any }) {
    let result;
    let db;
    try {
        db = await getPool();
        if (db) {
            result = await db.query(query, values);
        }
    } catch (error) {
        throw (error);
    } finally {
        db?.end();
    }
    return result!.rows;
}