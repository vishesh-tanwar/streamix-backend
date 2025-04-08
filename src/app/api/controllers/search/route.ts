import { getSearchService } from "@/app/services/search.service";
import { NextRequest, NextResponse } from "next/server";

class search {
    private service: getSearchService = new getSearchService();
    async getVideos(req: NextRequest) {
        try {
            const keywords = req.nextUrl.searchParams.get('keywords') || "";
            const result = await this.service.getData(keywords);
            if ((result ?? []).length > 0) {
                return NextResponse.json({ message: "successful", videos: result }, { status: 200 });
            }
            else {
                return NextResponse.json({ message: "successful", videos: "no videos found" });
            }
        } catch (error) {
            return NextResponse.json({ message: "server error", error: error });
        }
    }
}

export function GET(req: NextRequest) {
    return new search().getVideos(req);
}