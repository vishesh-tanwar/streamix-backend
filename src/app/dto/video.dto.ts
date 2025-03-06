import {
    IsNotEmpty,
    IsEnum,
    IsString,
    IsOptional,
    IsNumber
} from "class-validator";
import { VideoTypeEnum } from "@/app/utils/enums";
import { IVideo } from "../models/users/videoModel";

export class CreateVideoDto implements Omit<IVideo, 'video_id' | 'totallikes' | 'totaldislikes' | 'created_at'> {

    @IsNotEmpty({ message: "Title is required" })
    @IsString({ message: "Title must be a string" })
    title!: string;

    @IsNotEmpty({ message: "duration is required" })
    @IsString({ message: "duration must be a string" })
    duration!: string;

    @IsNotEmpty()
    @IsNumber({}, { message: "User ID must be a number" })
    id!: number; // Use `user_id` for consistency with IVideo

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
