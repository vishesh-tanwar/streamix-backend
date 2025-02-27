import { getAllVideosService } from "../services/getVideos.service";

export class getVideosController {
    private service: getAllVideosService = new getAllVideosService();
    async getAllVideos() {
        try {
            const result = await this.service.getAllVideosDb();
            return result;
        } catch (error) {
            throw error;
        }
    }
}