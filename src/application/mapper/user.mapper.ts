import { UserEntity } from "src/domain/entities/user.entity";
import { GetByIdResponse } from "../dto/response/user/getById.response";

export class UserMapper {

    public static fromDomainToResponse(user: UserEntity): GetByIdResponse {
        return new GetByIdResponse(
            user.id,
            user.name,
            user.email,
            user.createdAt,
            user.updatedAt,
        );
    }


    public static fromFindByEmailToDomain(user: GetByIdResponse): UserEntity {
        const entity = new UserEntity();
        entity.name = user.name;
        entity.email = user.email;
        entity.createdAt = user.createdAt;
        entity.updatedAt = user.updatedAt;
        return entity
    }

}