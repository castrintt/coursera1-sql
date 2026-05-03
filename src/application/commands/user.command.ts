export class CreateUserCommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}
}

export class DeleteUserCommand {
  constructor(
    public readonly id: string,
    public readonly requestingUserId: string,
  ) {}
}

export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly requestingUserId: string,
    public readonly name: string,
    public readonly email: string,
  ) {}
}

export class UpdateUserPasswordCommand {
  constructor(
    public readonly id: string,
    public readonly requestingUserId: string,
    public readonly password: string,
  ) {}
}

export class SendUserResetPasswordEmailCommand {
  constructor(
    public readonly id: string,
    public readonly requestingUserId: string,
  ) {}
}
