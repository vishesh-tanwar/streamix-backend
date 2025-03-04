import { HistoryDto } from "../dto/history.dto"
import { executeQuery } from "../utils/postgres";

export class historyService {
    async historyDb(data: HistoryDto) {
        const query = 'INSERT INTO history (video_id,id,type,thumbnail,title,video_data,total_likes,total_dislikes,description,uploaded_at,photo,name,handle,user_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *';
        const values = [data.video_id, data.id, data.type, data.thumbnail, data.title, data.video_data, data.total_likes, data.total_dislikes, data.description, data.uploaded_at, data.photo, data.name, data.handle, data.user_id];
        try {
            const result = await executeQuery({ query: query, values: values });
            return result;
        } catch (error) {
            console.error("Error inserting data into history:", error);
            throw new Error("Database Insertion Error");
        }
    }

    async checkHistoryDb(videoId: number, user_id: number) {
        try {
            const result = await executeQuery({ query: 'SELECT * FROM history where video_id = $1 and user_id = $2', values: [videoId, user_id] });
            return result?.length > 0 ? result : null;
        } catch (error) {
            return error;
        }
    }
}