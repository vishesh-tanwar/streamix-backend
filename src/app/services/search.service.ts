import { executeQuery } from "../utils/postgres";

export class getSearchService {
    async getData(keywords: String) {
        if (keywords == ''){
            return [];
        }
        try {
            var query = `SELECT * FROM videos join users on videos.id = users.id
            WHERE title ILIKE $1 OR description ILIKE $1`;
            var values = [`%${keywords}%`];
            var result = await executeQuery({ query: query, values: values });
            return result;
        } catch (error) {
            throw error;
        }
    }
}

