export class GetUserByIdQuery {
  constructor(public readonly userId: string) {}
}

export class FindUserByEmailQuery {
  constructor(public readonly email: string) {}
}
