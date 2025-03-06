import { getAllReelsService } from "@/app/services/getReels.service";
import { NextRequest, NextResponse } from "next/server";

class allReels {
    private service: getAllReelsService = new getAllReelsService();
    async getReels(req: NextRequest) {
        try {
            const page = parseInt(req.nextUrl.searchParams.get('page') ?? "0");
            const result = await this.service.allReelsDb(page);
            if (result) {
                return NextResponse.json({ message: "fetched successful", reels: result }, { status: 200 });
            }
        } catch (error) {
            return NextResponse.json({ message: "error fetching data", error: error }, { status: 500 });
        }
    }
}

export function GET(req: NextRequest) {
    return new allReels().getReels(req);
}