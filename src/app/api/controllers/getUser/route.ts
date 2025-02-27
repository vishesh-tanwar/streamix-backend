import { getUserService } from "@/app/services/getUser.service";
import { NextRequest, NextResponse } from "next/server";

const service = new getUserService();

export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const result = await service.getUserById(userId);

        return NextResponse.json({ message: "Successful", result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error: error }, { status: 500 });
    }
}