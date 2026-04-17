import { Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, IQueryHandler } from "@nestjs/cqrs";
import { UserMapper } from "src/application/mapper/user.mapper";
import { UserEntity } from "src/domain/entities/user.entity";
import { type IUserRepository } from "src/domain/interfaces/IUserRepository";
import { UserRepositorySymbol } from "src/modules/symbols/symbols";
import { FindUserByEmailQuery } from "../../user.query";

@CommandHandler(FindUserByEmailQuery)
export class FindUserByEmailHandler implements IQueryHandler<FindUserByEmailQuery> {
    constructor(
        @Inject(UserRepositorySymbol)
        private readonly _user_repository: IUserRepository,
    ) { }

    async execute(query: FindUserByEmailQuery): Promise<UserEntity> {
        const foundUser = await this._user_repository.findByEmail(query.email);
        if (!foundUser) throw new NotFoundException('User not found with email: ' + query.email);
        return UserMapper.fromFindByEmailToDomain(foundUser);
    }
}   