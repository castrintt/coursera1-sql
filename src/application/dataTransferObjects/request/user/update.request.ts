import { IsEmail, IsString, IsUUID } from "class-validator";

export class UpdateUserRequest {

    @IsUUID('4')
    public readonly id: string;

    @IsString()
    public readonly name: string;

    @IsEmail({}, { message: 'Invalid email' })
    public readonly email: string;
}