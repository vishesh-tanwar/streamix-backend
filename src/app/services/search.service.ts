import { executeQuery } from "../utils/postgres";

export class getSearchService {
    async getData(keywords: String) {
        try {
            const query = 'SELECT * FROM videos WHERE title ILIKE $1';
            const values = [`%${keywords}%`];
            const result = await executeQuery({ query: query, values: values });
            return result;
        } catch (error) {
            throw error;
        }
    }
}

