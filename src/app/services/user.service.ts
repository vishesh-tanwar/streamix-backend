import { randomInt } from "crypto";
import { CreateUserDTO } from "../dto/user.dto";
import { executeQuery } from "../utils/postgres";

export class UserService {
    async checkUserDb(email: string) {
        try {
            const result = await executeQuery({ query: "SELECT * FROM users WHERE email = $1", values: [email] });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async createUserDb(user: CreateUserDTO) {
        try {
            const handle = `${user.name}@${user.name.length}${randomInt(1, 1000)}`;
            const result = await executeQuery(
                {
                    query: "INSERT INTO users (name, email,handle,photo) VALUES ($1, $2, $3,$4) RETURNING id, name, email ,handle, photo",
                    values: [user.name, user.email, handle, user.photo]
                }
            );
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}
