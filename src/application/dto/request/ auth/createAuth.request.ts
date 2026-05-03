import { IsEmail, IsString } from 'class-validator';
import { ValidationMessages } from 'src/shared/constants/validation-messages';

export class CreateAuthRequest {
  @IsEmail({}, { message: ValidationMessages.emailInvalid })
  public readonly email: string;

  @IsString({ message: ValidationMessages.passwordRequired })
  public readonly password: string;
}
