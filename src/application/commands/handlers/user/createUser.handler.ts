import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserEntity } from 'src/domain/entities/user.entity';
import { type IUserRepository } from 'src/domain/interfaces/IUserRepository';
import { UserRepositorySymbol } from 'src/modules/symbols/symbols';
import { normalizeEmail } from 'src/shared/utils/normalize-email';
import { CreateUserCommand } from '../../user.command';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly _user_repository: IUserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<{ id: string }> {
    const user = new UserEntity();
    user.name = command.name.trim();
    user.email = normalizeEmail(command.email);
    user.password = command.password;
    return this._user_repository.create(user);
  }
}
