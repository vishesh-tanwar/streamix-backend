import { executeQuery } from "../utils/postgres";

export class getAllReelsService {
    async allReelsDb(page: number) {
        try {
            const _offset = page * 4;
            const query = `SELECT * FROM users JOIN videos on users.id = videos.id where type='reel' ORDER BY videos.uploaded_at DESC limit 4 OFFSET ${_offset}`;
            const result = await executeQuery({ query: query, values: [] });
            return result;
        } catch (error) {
            throw error;
        }
    }

}