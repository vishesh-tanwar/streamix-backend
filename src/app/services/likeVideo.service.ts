import { executeQuery } from "../utils/postgres";

export class LikeVideoService {
    async likeVideoDb(userId: string, videoId: string) {
        try {
            const query = `
                    WITH updated_history AS (
                    UPDATE history
                    SET has_liked = TRUE,
                        has_disliked = FALSE
                    WHERE id = $1 AND video_id = $2
                        AND has_liked = FALSE
                    RETURNING *
                    ),
                    updated_video AS (
                    UPDATE videos
                    SET total_likes = total_likes + 1
                    WHERE video_id = $2
                        AND EXISTS (
                        SELECT 1 FROM updated_history
                        )
                    RETURNING *
                    )
                    SELECT * FROM updated_video;
                `;
            const values = [userId, videoId];
            const result = await executeQuery({ query, values });
            return result;
        } catch (error) {
            console.error("Error liking video:", error);
            throw error;
        }
    }
}