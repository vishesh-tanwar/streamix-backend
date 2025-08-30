import { DislikeVideoService } from "@/app/services/dislikeVideo.service";
import { NextRequest, NextResponse } from "next/server";

class DislikeVideo {
    private service : DislikeVideoService = new DislikeVideoService();
    async dislikeVideo(req: NextRequest) {
        try {
            const userId = req.nextUrl.searchParams.get('userId');
            const videoId = req.nextUrl.searchParams.get('videoId');
            const result = await this.service.dislikeVideoDb(userId as string, videoId as string);
            if (result.length > 0) {
                return  NextResponse.json({ message: "Video disliked successfully", result }, { status: 200 });
            } else {
                console.log("Video already disliked");
                return  NextResponse.json({ message: "video already disliked" }, { status: 200 });
            }
            
        } catch (error) {
            return Response.json({ message: "Error in server" }, { status: 500 });
        }
    }
}
export function POST(req : NextRequest) {
    return new DislikeVideo().dislikeVideo(req);
}