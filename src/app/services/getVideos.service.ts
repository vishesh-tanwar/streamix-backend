import { executeQuery } from "../utils/postgres";

export class getAllVideosService {
    async getAllVideosDb(page: number) {
        try {
            const offset = page * 2;
            const query = `
                SELECT * FROM videos 
                JOIN users ON videos.id = users.id 
                WHERE type = 'video'
                ORDER BY videos.uploaded_at DESC
                LIMIT 2 OFFSET $1;
            `;
            const value = [offset]
            const result = await executeQuery({ query: query, values: value });
            return result;
        } catch (error) {
            throw error;
        }
    }
}