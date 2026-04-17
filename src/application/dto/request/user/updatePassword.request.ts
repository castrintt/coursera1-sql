import { IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserPasswordRequest {
    @IsString({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(20, { message: 'Password must be less than 20 characters long' })
    public readonly password: string
}