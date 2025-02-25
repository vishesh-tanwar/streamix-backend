import {
    IsNotEmpty,
    IsEnum,
    IsString,
    IsOptional,
    IsNumber
} from "class-validator";
import { VideoTypeEnum } from "@/app/utils/enums";
import { IVideo } from "../models/users/videoModel";

export class CreateVideoDto implements Omit<IVideo, 'id' | 'totallikes' | 'totaldislikes' | 'created_at'> {

    @IsNotEmpty({ message: "Title is required" })
    @IsString({ message: "Title must be a string" })
    title!: string;

    @IsNotEmpty({ message: "MIME type is required" })
    @IsString({ message: "MIME type must be a string" })
    mime_type!: string;

    @IsNotEmpty()
    @IsNumber({}, { message: "User ID must be a number" })
    user_id!: number; // Use `user_id` for consistency with IVideo

    @IsEnum(VideoTypeEnum, { message: "Type must be either 'video' or 'reel'" })
    type!: VideoTypeEnum;

    @IsOptional()
    thumbnail?: string;

    @IsNotEmpty()
    @IsString({ message: "Description must be a string" })
    description?: string;

    @IsOptional()
    video_data?: string;
}
