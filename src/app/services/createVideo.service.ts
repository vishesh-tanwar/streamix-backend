import { CreateVideoDto } from "../dto/video.dto";
import { executeQuery } from "../utils/postgres";

export class CreateVideoService {
    async createVideoDb(video: CreateVideoDto) {
        try {
            const query = `
                INSERT INTO videos (id,title,description,video_data , thumbnail,type,duration) 
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

            const values = [
                video.id,
                video.title,
                video.description,
                video.video_data,
                video.thumbnail,
                video.type,
                video.duration
            ];

            const result = await executeQuery({ query, values });
            return result;
        } catch (error) {
            console.error("Error inserting video:", error);
            throw error;
        }
    }
}
