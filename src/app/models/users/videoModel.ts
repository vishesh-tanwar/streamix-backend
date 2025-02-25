import { VideoTypeEnum } from "@/app/utils/enums";

export interface IVideo {
    id: number;
    user_id: number;
    type: VideoTypeEnum;
    thumbnail?: string;
    title: string;
    description?: string;
    video_data?: string;
    mime_type: string;
    totallikes: number;
    totaldislikes: number;
    created_at: Date;
}
