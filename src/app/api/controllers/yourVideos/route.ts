import { YourVideosService } from "@/app/services/yourVideos.service";
import { NextRequest, NextResponse } from "next/server";

class YourVideos {
    private service : YourVideosService = new YourVideosService();
        async getVideos(req: NextRequest){
            try {
            const userId = req.nextUrl.searchParams.get('userId');

            if (!userId) {
                return new Response(JSON.stringify({ message: "User ID not provided" }), { status: 400 });
            }
            const result = await this.service.getVideos(userId as string);
            if (result.length == 0) {
                return NextResponse.json({ message: "No videos found" }, { status: 200 });
            }
            return NextResponse.json({ message: "Successful", result }, { status: 200 });
        } catch
        (error) {
            console.error("Error fetching videos:", error);
            return new Response(JSON.stringify({ message: "Server Error", error: error }), { status: 500 });
        }
        }
}

export function GET(req: NextRequest) {
    return new YourVideos().getVideos(req);
}