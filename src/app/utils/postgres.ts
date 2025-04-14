import { Pool } from "pg";

export function getPool() {
    let pool;
    try {
        pool = new Pool({
            host: "127.0.0.1",
            port: 5432,
            user: "postgres",
            password: "v1n2820a",
            database: "postgres",
        });

    } catch (e) {
        throw (e);
    }
    if (pool) {
        return pool;
    } else { return null; }
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