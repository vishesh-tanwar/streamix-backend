import { executeQuery } from "../utils/postgres";

export class DislikeVideoService {
    async dislikeVideoDb(userId: string, videoId: string) {
        try {
            const query = `
                WITH updated_history AS (
                UPDATE history
                SET has_disliked = true,
                    has_liked = false
                WHERE id = $1
                    AND video_id = $2
                    AND has_disliked = false
                RETURNING *
                )
                UPDATE videos
                SET total_dislikes = total_dislikes + 1,
                    total_likes = CASE
                    WHEN EXISTS (
                        SELECT 1 FROM history
                        WHERE user_id = $1 AND video_id = $2 AND has_liked = true
                    ) THEN GREATEST(total_likes - 1, 0)
                    ELSE total_likes
                    END
                WHERE video_id = $2
                AND EXISTS (
                    SELECT 1 FROM updated_history
                )
                RETURNING *;
                `;

            const values = [userId, videoId];
            const result = await executeQuery({ query, values });
            return result;
        } catch (error) {
            console.error("Error disliking video:", error);
            throw error;
        }
    }
}