import { executeQuery } from "../utils/postgres";

export class getAllReelsService {
    async allReelsDb() {
        try {
            const query = `SELECT * FROM users JOIN videos on users.id = videos.id where type='reel'`;
            const result = await executeQuery({ query: query, values: [] });
            return result;
        } catch (error) {
            throw error;
        }
    }

}