import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepositorySymbol } from 'src/modules/symbols/symbols';
import { type IUserRepository } from 'src/domain/interfaces/IUserRepository';
import { SendUserResetPasswordEmailCommand } from '../../user.command';

@Injectable()
@CommandHandler(SendUserResetPasswordEmailCommand)
export class SendUserResetPasswordEmailHandler
  implements ICommandHandler<SendUserResetPasswordEmailCommand>
{
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly _user_repository: IUserRepository,
  ) {}

  async execute(command: SendUserResetPasswordEmailCommand): Promise<void> {
    if (command.requestingUserId !== command.id) {
      throw new NotFoundException();
    }
    // TODO: implementar envio de e-mail com link de redefinição de senha
  }
}
