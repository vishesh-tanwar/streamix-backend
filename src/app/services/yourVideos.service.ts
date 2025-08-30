import { executeQuery } from "../utils/postgres";

export class YourVideosService {
    async getVideos(userId: String) {
        try {
            const query = `SELECT * FROM videos WHERE id = $1`;
            const values = [userId];
            const result = await executeQuery({ query, values });
            return result ?? [];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}