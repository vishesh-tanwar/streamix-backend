import { executeQuery } from "../utils/postgres";

export class DeleteVideoService {
    async deleteVideoDb(videoId: string) {
        try {
            const query = `DELETE FROM videos WHERE video_id = $1 RETURNING *`;
            const values = [videoId];
            const result = await executeQuery({ query, values });
            return result;
        } catch (error) {
            console.error("Error deleting video:", error);
            throw error;
        }
    }
}