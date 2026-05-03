import { Inject, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { SignInAuthResult } from 'src/application/dto/response/user/signInAuth.response';
import { UserMapper } from 'src/application/mapper/user.mapper';
import { type IUserRepository } from 'src/domain/interfaces/IUserRepository';
import { UserRepositorySymbol } from 'src/modules/symbols/symbols';
import { ApiErrorMessages } from 'src/shared/constants/api-error-messages';
import { RefreshAuthCommand } from '../../auth.command';

type JwtPayload = { sub: string; email: string };

@CommandHandler(RefreshAuthCommand)
export class RefreshAuthHandler implements ICommandHandler<RefreshAuthCommand> {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly _user_repository: IUserRepository,
    private readonly _jwt_service: JwtService,
  ) {}

  async execute(command: RefreshAuthCommand): Promise<SignInAuthResult> {
    if (!command.refreshToken?.trim()) {
      throw new UnauthorizedException(
        ApiErrorMessages.auth.refreshTokenMissing,
      );
    }

    let payload: JwtPayload;
    try {
      payload = this._jwt_service.verify<JwtPayload>(command.refreshToken);
    } catch {
      throw new UnauthorizedException(
        ApiErrorMessages.auth.refreshTokenInvalidOrExpired,
      );
    }

    const userEntity = await this._user_repository.findUserEntityByEmail(
      payload.email,
    );
    if (!userEntity || userEntity.id !== payload.sub) {
      throw new UnauthorizedException(ApiErrorMessages.auth.sessionInvalid);
    }

    const nextPayload = { sub: userEntity.id, email: userEntity.email };
    const accessToken = this._jwt_service.sign(nextPayload);
    const refreshToken = this._jwt_service.sign(nextPayload, {
      expiresIn: '7d',
    });

    const user = UserMapper.fromDomainToResponse(userEntity);
    return new SignInAuthResult(
      user.id,
      user.name,
      user.email,
      user.createdAt,
      user.updatedAt,
      accessToken,
      refreshToken,
    );
  }
}
