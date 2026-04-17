export class SignInAuthCommand {
    constructor(
        public readonly email: string,
        public readonly password: string,
    ) { }
}

export class RefreshAuthCommand {
    constructor(public readonly refreshToken: string) { }
}