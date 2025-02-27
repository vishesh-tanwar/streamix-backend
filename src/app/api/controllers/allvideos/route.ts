import { getVideosController } from "@/app/controllers/getVideos.controller";
import { NextResponse } from "next/server";

class getVideos {
    private controller: getVideosController = new getVideosController();
    async allVideos(req: Request) {
        try {
            const result = await this.controller.getAllVideos();
            return NextResponse.json({ message: "Successful", videos: result }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Failed to fetch video records !!", error: error }, { status: 400 });
        }
    }
}

export function GET(req: Request) {
    return new getVideos().allVideos(req);
}