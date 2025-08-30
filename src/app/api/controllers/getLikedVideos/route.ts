import { getLikedVideosService } from "@/app/services/getLikedVideosDb";
import { executeQuery } from "@/app/utils/postgres";
import { NextRequest, NextResponse } from "next/server";

class LikedVideos {
    private service : getLikedVideosService  = new getLikedVideosService();
    async getLikedVideos(req : NextRequest) {
        try {
            const userId = req.nextUrl.searchParams.get('userId');
            if (!userId) {
                return NextResponse.json({ message: "User ID not provided" }, { status: 400 });
            }
            const result = await this.service.getLikedVideosDb(userId);
            return NextResponse.json({ message: "Liked videos fetched successfully", result }, { status: 200 });
            
        } catch (error) {
            return NextResponse.json({ message: "Error fetching liked videos" }, { status: 500 });
        }
    }
}

export function GET(req: NextRequest)  {
  return new LikedVideos().getLikedVideos(req);
};