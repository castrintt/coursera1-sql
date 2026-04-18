import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignOutCommand } from '../../auth.command';

export type SignOutResult = { ok: true };

@CommandHandler(SignOutCommand)
export class SignOutHandler implements ICommandHandler<SignOutCommand> {
  async execute(): Promise<SignOutResult> {
    return { ok: true };
  }
}
