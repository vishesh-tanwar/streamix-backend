import { CreateUserDTO } from "../dto/user.dto";
import { UserService } from "../services/user.service";
import { generateToken } from "../utils/jwt";

export class UserController {
    private service: UserService = new UserService();
    async createUser(user: CreateUserDTO) {
        try {
            const existingUser = await this.checkUser(user.email);

            if ((existingUser !== null || existingUser !== undefined) && existingUser!.length > 0) {
                // console.log(existingUser);

                let newUser = existingUser![0];
                const token = generateToken({ user: newUser });
                newUser['token'] = token;
                return newUser
            }
            const result = await this.service.createUserDb(user);
            let newUser = result![0];
            const token = generateToken({ user: newUser });
            newUser = { ...newUser, token: token };
            return newUser;
        } catch (error: any) {
            console.log(`throwing from controllers catch ${error.message}`);
            throw error;
        }
    }
    async checkUser(email: string) {
        try {
            const result = await this.service.checkUserDb(email);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}