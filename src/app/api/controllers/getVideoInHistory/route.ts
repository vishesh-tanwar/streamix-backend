import { GetVideoInHistoryService } from "@/app/services/getVideoInHistory";
import { NextRequest, NextResponse } from "next/server";

class GetVideoInHistory{
    private service: GetVideoInHistoryService = new GetVideoInHistoryService();
    async getVideoInHistory(req: NextRequest){
        try {
            const userId = req.nextUrl.searchParams.get('userId');  // user's id not uploader
            const videoId = req.nextUrl.searchParams.get('videoId');
            if (!userId || !videoId) {
                return NextResponse.json({ message: "User ID and Video ID are required" }, { status: 400 });
            }
            const result = await this.service.getVideoInHistoryDb(userId, videoId);
            return NextResponse.json({ message: "Video fetched successfully", result }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Error fetching video from history" }, { status: 500 });
        }
    }
}
export function GET(req: NextRequest){
    return new GetVideoInHistory().getVideoInHistory(req);
}