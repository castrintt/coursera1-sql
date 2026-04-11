import { Inject, Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserRepository, UserRepositorySymbol } from "src/infrastructure/repository/user.repository";
import { PasswordToHash } from "src/shared/utils/passwordToHash";
import { Repository } from "typeorm";
import { CreateUserCommand } from "../../user.command";


@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {

    constructor(
        @Inject(UserRepositorySymbol)
        private readonly _user_repository: Repository<UserRepository>,
    ) { }

    async execute(command: CreateUserCommand): Promise<{ id: string }> {
        const user = await this.mapCommandToRepository(command)
        const { id } = await this._user_repository.save(user)
        return { id };
    }

    private async mapCommandToRepository(command: CreateUserCommand): Promise<CreateUserCommand> {
        const hashPassword = await PasswordToHash.hash(command.password);
        return new CreateUserCommand(
            command.name,
            command.email,
            hashPassword,
        );;
    }
}