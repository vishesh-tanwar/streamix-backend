import { HistoryDto } from "@/app/dto/history.dto";
import { historyService } from "@/app/services/history.service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextRequest, NextResponse } from "next/server";

class History {
    private service: historyService = new historyService();

    async getHistory(req: NextRequest) {
        try {
            const data = await req.json();

            const dto = plainToInstance(HistoryDto, data);
            const errors = await validate(dto);

            if (errors.length > 0) {
                return NextResponse.json({
                    error: "Validation Failed",
                    details: errors.map((err) => err.constraints),
                }, { status: 400 });
            }

            if (data.user_id == -1) {
                return NextResponse.json({ message: "user Not logged In" }, { status: 401 });
            }

            const isDataInHistory = await this.service.checkHistoryDb(data.video_id, data.user_id);
            if (isDataInHistory) {
                console.log("already in History");

                return NextResponse.json({ message: "already in history" }, { status: 200 });
            }

            const result = await this.service.historyDb(data);
            console.log('inserted into history');

            return NextResponse.json({ message: "Sent to history successfully", history: result }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Error in server" }, { status: 500 });
        }
    }
}

export function POST(req: NextRequest) {
    return new History().getHistory(req);
}
