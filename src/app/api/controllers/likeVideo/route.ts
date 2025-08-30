import { LikeVideoService } from "@/app/services/likeVideo.service";
import { NextRequest, NextResponse } from "next/server";

class LikeVideo {
    private service : LikeVideoService = new LikeVideoService();
    async likeVideo(req: NextRequest) {
        try {
            const userId = req.nextUrl.searchParams.get('userId');
            const videoId = req.nextUrl.searchParams.get('videoId');
            const result = await this.service.likeVideoDb(userId as string, videoId as string);
            if (result.length > 0) {
                return  NextResponse.json({ message: "Video liked successfully", result }, { status: 200 });
            } else {
                console.log("Video already liked");
                
                return  NextResponse.json({ message: "Video Already liked" }, { status: 200 });
            }
            
        } catch (error) {
            return Response.json({ message: "Error in server" }, { status: 500 });
        }
    }
}
export function POST(req : NextRequest) {
    return new LikeVideo().likeVideo(req);
}