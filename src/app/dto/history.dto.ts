import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsDate, isNotEmpty } from "class-validator";
import { IHistory } from "../models/users/historyModel";
import { VideoTypeEnum } from "../utils/enums";

export class HistoryDto implements Omit<IHistory, 'history_id'> {
    @IsNotEmpty()
    @IsString()
    photo!: string

    @IsNotEmpty()
    @IsString()
    duration!: string

    @IsNotEmpty()
    @IsString()
    name!: string

    @IsNotEmpty()
    @IsString()
    handle!: string

    @IsNotEmpty()
    @IsNumber()
    total_likes!: number;

    @IsNotEmpty()
    @IsNumber()
    total_dislikes!: number;

    @IsNotEmpty()
    @IsString()
    uploaded_at!: Date;

    @IsNotEmpty({ message: "Title is required" })
    @IsString({ message: "Title must be a string" })
    title!: string;

    @IsNotEmpty()
    @IsNumber({}, { message: "User ID must be a number" })
    id!: number;

    @IsNotEmpty()
    @IsNumber({}, { message: "Video ID must be a number" })
    video_id!: number;

    @IsNotEmpty()
    @IsNumber({}, { message: "Video ID must be a number" })
    user_id!: number;

    @IsEnum(VideoTypeEnum, { message: "Type must be either 'video' or 'reel'" })
    type!: VideoTypeEnum;

    @IsOptional()
    @IsString({ message: "Thumbnail must be a string" })
    thumbnail?: string;

    @IsOptional()
    @IsString({ message: "Description must be a string" })
    description?: string;

    @IsOptional()
    @IsString({ message: "Video data must be a string" })
    video_data?: string;
}