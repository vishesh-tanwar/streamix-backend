import { getVideoByIdService } from "@/app/services/getVideoById.service";
import { NextRequest, NextResponse } from "next/server";

class getHistory {
    private service: getVideoByIdService = new getVideoByIdService();
    async getHistoryById(req: NextRequest) {
        try {
            const videoId = req.nextUrl.searchParams.get('videoId');
            if (!videoId) {
                return NextResponse.json({ error: "video ID is required" }, { status: 400 });
            }
            const result = await this.service.getHistoryByIdDb(videoId);
            return NextResponse.json({ message: "Successful", result }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Error", error: error }, { status: 500 });
        }
    }
}
export function GET(req: NextRequest) {
    return new getHistory().getHistoryById(req);
}