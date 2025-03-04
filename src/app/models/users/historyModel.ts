import { VideoTypeEnum } from "@/app/utils/enums";

export interface IHistory {
    history_id?: number;
    video_id: number;
    id: number;
    user_id: number;
    type: VideoTypeEnum;
    thumbnail?: string;
    title: string;
    description?: string;
    video_data?: string;
    total_likes: number;
    total_dislikes: number;
    uploaded_at: Date;
    photo: string;
    name: string;
    handle: string;
}