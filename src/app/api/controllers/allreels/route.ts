import { getAllReelsService } from "@/app/services/getReels.service";
import { NextResponse } from "next/server";

class allReels {
    private service: getAllReelsService = new getAllReelsService();
    async getReels() {
        try {
            const result = await this.service.allReelsDb();
            if (result) {
                return NextResponse.json({ message: "fetched successful", reels: result }, { status: 200 });
            }
        } catch (error) {
            return NextResponse.json({ message: "error fetching data", error: error }, { status: 500 });
        }
    }
}

export function GET() {
    return new allReels().getReels();
}