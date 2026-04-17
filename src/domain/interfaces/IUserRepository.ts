import { GetByIdResponse } from "src/application/dto/response/user/getById.response";
import { UserEntity } from "../entities/user.entity";

export interface IUserRepository {
    create(user: UserEntity): Promise<{ id: string }>;
    findById(id: string): Promise<GetByIdResponse>;
    findByEmail(email: string): Promise<GetByIdResponse>;
    findUserEntityByEmail(email: string): Promise<UserEntity | null>;
    update(user: UserEntity): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}