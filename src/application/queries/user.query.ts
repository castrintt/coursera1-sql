export class GetUserByIdQuery {
  constructor(
    public readonly userId: string,
    public readonly requestingUserId: string,
  ) {}
}

export class FindUserByEmailQuery {
  constructor(public readonly email: string) {}
}
