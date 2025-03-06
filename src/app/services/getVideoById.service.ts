import { executeQuery } from "../utils/postgres";

export class getVideoByIdService {
    async getHistoryByIdDb(videoId: string) {
        try {
            const result = executeQuery({ query: 'SELECT * FROM videos JOIN users on videos.id = users.id where video_id = $1', values: [videoId] });
            return result || [];
        } catch (error) {
            throw error;
        }
    }
}