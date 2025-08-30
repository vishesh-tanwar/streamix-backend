import { DeleteVideoService } from "@/app/services/deleteVideo.service";
import { NextRequest, NextResponse } from "next/server";

class DeleteVideo {
    private service: DeleteVideoService = new DeleteVideoService(); 
    async deleteVideo(req: NextRequest) {
        try {
            const videoId = req.nextUrl.searchParams.get('videoId');
            if (!videoId) {
                return NextResponse.json({ message: "Video ID not provided" }, { status: 400 });
            }
            const result = await this.service.deleteVideoDb(videoId as string);
            if (result.length > 0) {
                return NextResponse.json({ message: "Video deleted successfully"}, { status: 200 });            
            } else {
                return NextResponse.json({ message: "Video not found" }, { status: 404 });
            }
            
        } catch (error) {
            return NextResponse.json({ message: "error deleting video" }, { status: 500 });
        }
    }
}

export function POST(req: NextRequest) {
    return new DeleteVideo().deleteVideo(req);
}