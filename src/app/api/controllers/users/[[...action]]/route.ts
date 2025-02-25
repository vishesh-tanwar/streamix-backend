import { NextResponse } from "next/server";
import { UserController } from "@/app/controllers/user.controller";
import { plainToInstance } from "class-transformer";
import { CreateUserDTO } from "@/app/dto/user.dto";
import { validate } from "class-validator";

class UserRoutes {
    private controller: UserController = new UserController();

    async addUser(req: Request) {
        try {
            const user = await req.json();

            const userDTO = plainToInstance(CreateUserDTO, user);

            const errors = await validate(userDTO);
            if (errors.length > 0) {
                return NextResponse.json({
                    error: "Validation Failed",
                    details: errors.map((err) => err.constraints),
                }, { status: 400 });
            }

            const result = await this.controller.createUser(userDTO);
            console.log(result);

            return NextResponse.json({ message: "User created", user: result, }, { status: 201 });
        } catch (error: unknown) {
            const errMsg = error instanceof Error ? error.message : "Unknown error";
            return NextResponse.json({ error: "Server Error", details: errMsg }, { status: 400 });
        }
    }
}

export function POST(req: Request) {
    return new UserRoutes().addUser(req);
}
