import { executeQuery } from "../utils/postgres";

export class getHistoryService {
    async getHistoryByIdDb(userId: string) {
        try {
            const result = executeQuery({ query: 'SELECT * FROM history where user_id = $1', values: [userId] });
            return result || [];
        } catch (error) {
            throw error;
        }
    }
}