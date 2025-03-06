import { getVideosController } from "@/app/controllers/getVideos.controller";
import { NextRequest, NextResponse } from "next/server";

class getVideos {
    private controller: getVideosController = new getVideosController();
    async allVideos(req: NextRequest) {
        try {
            const page = parseInt(req.nextUrl.searchParams.get('page') ?? "0");
            const result = await this.controller.getAllVideos(page);
            return NextResponse.json({ message: "Successful", videos: result }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Failed to fetch video records !!", error: error }, { status: 400 });
        }
    }
}

export function GET(req: NextRequest) {
    return new getVideos().allVideos(req);
}