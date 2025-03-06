import { VideoTypeEnum } from "@/app/utils/enums";

export interface IVideo {
    video_id: number;
    id: number;
    type: VideoTypeEnum;
    thumbnail?: string;
    title: string;
    description?: string;
    video_data?: string;
    totallikes: number;
    totaldislikes: number;
    created_at: Date;
    duration: string;
}
