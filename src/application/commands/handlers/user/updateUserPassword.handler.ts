import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepositorySymbol } from 'src/modules/symbols/symbols';
import { type IUserRepository } from 'src/domain/interfaces/IUserRepository';
import { PasswordToHash } from 'src/shared/utils/passwordToHash';
import { UpdateUserPasswordCommand } from '../../user.command';

@Injectable()
@CommandHandler(UpdateUserPasswordCommand)
export class UpdateUserPasswordHandler
  implements ICommandHandler<UpdateUserPasswordCommand>
{
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly _user_repository: IUserRepository,
  ) {}

  async execute(command: UpdateUserPasswordCommand): Promise<boolean> {
    if (command.requestingUserId !== command.id) {
      throw new NotFoundException();
    }
    const hashedPassword = await PasswordToHash.hash(command.password);
    return this._user_repository.updatePassword(command.id, hashedPassword);
  }
}
