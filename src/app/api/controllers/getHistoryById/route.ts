import { getHistoryService } from "@/app/services/getHistoryById.service";
import { NextRequest, NextResponse } from "next/server";

class getHistory {
    private service: getHistoryService = new getHistoryService();
    async getHistoryById(req: NextRequest) {
        try {
            const userId = req.nextUrl.searchParams.get('userId');
            if (!userId) {
                return NextResponse.json({ error: "User ID is required" }, { status: 400 });
            }
            console.log(req.headers.get("x-user-id"));

            const result = await this.service.getHistoryByIdDb(userId);
            return NextResponse.json({ message: "Successful", result }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Error", error: error }, { status: 500 });
        }
    }
}
export function GET(req: NextRequest) {
    return new getHistory().getHistoryById(req);
}