import { getAllVideosService } from "../services/getVideos.service";

export class getVideosController {
    private service: getAllVideosService = new getAllVideosService();
    async getAllVideos(page: number) {
        try {
            const result = await this.service.getAllVideosDb(page);
            return result;
        } catch (error) {
            throw error;
        }
    }
}