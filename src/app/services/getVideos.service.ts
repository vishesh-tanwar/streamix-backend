import { getPool } from "../utils/postgres";

export class getAllVideosService {
    async getAllVideosDb() {
        try {
            const query = `SELECT * FROM videos JOIN users on videos.id = users.id WHERE type = 'video' `;
            const db = await getPool();
            const result = await db?.query(query);
            return result?.rows || [];
        } catch (error) {
            throw error;
        }
    }
}