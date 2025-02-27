import { createVideoController } from "@/app/controllers/createVideo.controller";
import { CreateVideoDto } from "@/app/dto/video.dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export const config = {
    api: {
        bodyParser: false,
    },
};

class CreateVideo {
    private videoController: createVideoController = new createVideoController();

    async upload(req: Request) {
        try {
            console.log("Headers:", req.headers);
            const formData = await req.formData();
            console.log("form-data : ", formData);

            const fileData = formData.get("video_data") as File;
            console.log("video_data : ", fileData);
            const thumbnail = formData.get("thumbnail") as File;
            console.log("image_data : ", thumbnail);

            const userId = req.headers.get("x-user-id") || formData.get("id");
            const title = String(formData.get("title")).trim();
            console.log(title);
            const type = formData.get("type") as string;

            const description = formData.get("description") as string;
            const mimeType = formData.get("mime_type") as string;

            const uploadDir = path.join(process.cwd(), "public/uploads");
            await fs.mkdir(uploadDir, { recursive: true });
            const filePath = path.join(uploadDir, fileData.name);
            const fileBuffer = Buffer.from(await fileData.arrayBuffer());
            await fs.writeFile(filePath, fileBuffer);
            console.log("File saved at:", filePath);

            const uploadThumbnailDir = path.join(process.cwd(), "public/thumbnails")
            await fs.mkdir(uploadThumbnailDir, { recursive: true });
            const thumbnailPath = path.join(uploadThumbnailDir, thumbnail.name);
            const thumbnailBuffer = Buffer.from(await thumbnail.arrayBuffer());
            await fs.writeFile(thumbnailPath, thumbnailBuffer);
            console.log("thumbnail saved at : ", thumbnailPath);

            const fPath = filePath.replace("/home/vishesh/Desktop/flutter/youtube2/backend/public", "");
            const tPath = thumbnailPath.replace("/home/vishesh/Desktop/flutter/youtube2/backend/public", "");

            // Map form-data fields to DTO
            const videoDto = plainToInstance(CreateVideoDto, {
                id: parseInt(userId as string),
                title,
                type,
                thumbnail: tPath,
                description,
                mime_type: mimeType,
                video_data: fPath,
            });

            // Validate DTO
            const errors = await validate(videoDto);
            if (errors.length > 0) {
                return NextResponse.json(
                    {
                        error: "Validation Failed",
                        details: errors.map((err) => err.constraints || {}),
                    },
                    { status: 400 }
                );
            }

            // Save video to database
            const result = await this.videoController.createVideo(videoDto);
            if (result) {
                return NextResponse.json({ message: "Video uploaded successfully" }, { status: 200 });
            }

            return NextResponse.json({ message: "Video upload failed" }, { status: 500 });
        } catch (error) {
            console.error("Upload failed:", error);
            return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        }
    }
}

export function POST(req: Request) {
    return new CreateVideo().upload(req);
}
