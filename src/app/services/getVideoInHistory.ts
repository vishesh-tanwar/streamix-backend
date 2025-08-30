import { executeQuery } from "../utils/postgres";

export class GetVideoInHistoryService{
    async getVideoInHistoryDb(userId: string, videoId: string) {
        try {
            const result = await executeQuery({
                query: 'SELECT * FROM history WHERE user_id = $1 AND video_id = $2',
                values: [userId, videoId],
            });
            return result || [];
        } catch (error) {
            throw error;
        }
    }
}