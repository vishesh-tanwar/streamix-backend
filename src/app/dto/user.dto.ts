import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IUser } from "../models/users/userModel";

export class CreateUserDTO implements Omit<IUser, 'id' | 'created_at' | 'handle'> {
    @IsNotEmpty({ message: "Name is required" })
    name!: string;

    @IsEmail({}, { message: "Invalid email format" })
    email!: string;

    @IsOptional()
    @IsString({ message: "photo must be a string" })
    photo!: string;
}

