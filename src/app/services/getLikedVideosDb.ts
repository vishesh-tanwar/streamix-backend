import { executeQuery } from "../utils/postgres";

export class getLikedVideosService{
    async getLikedVideosDb(userId: string) {
        try {
            const result = executeQuery({ query: 'SELECT * FROM history where user_id = $1 AND has_liked = true', values: [userId] });
            return result || [];
        } catch (error) {
            throw error;
        }
    }
}  