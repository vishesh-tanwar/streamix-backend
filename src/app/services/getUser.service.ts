import { executeQuery, getPool } from "../utils/postgres";

export class getUserService {
    async getUserById(userId: string) {
        try {
            const query = `SELECT * FROM users WHERE id = $1`;
            const result = await executeQuery({ query: query, values: [parseInt(userId)] });
            console.log('service ', result);

            return result || [];
        } catch (error) {
            throw error;
        }
    }
}