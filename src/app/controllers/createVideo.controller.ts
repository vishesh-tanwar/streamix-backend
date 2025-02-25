import { CreateVideoDto } from "../dto/video.dto";
import { CreateVideoService } from "../services/createVideo.service";

export class createVideoController {
    private createVideoServiceController: CreateVideoService = new CreateVideoService();
    async createVideo(video: CreateVideoDto) {
        try {
            const result = await this.createVideoServiceController.createVideoDb(video);
            return result;
        } catch (error) {
            throw error;
        }
    }
}