import { IsEmail, IsString } from "class-validator"

export class CreateAuthRequest {
    @IsEmail({}, { message: 'Invalid email' })
    public readonly email: string
    @IsString({ message: 'Password is required' })
    public readonly password: string
}