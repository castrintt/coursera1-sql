export class SignInAuthResult {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly accessToken: string,
    public readonly refreshToken: string,
  ) {}
}
