import { IsEmail, IsString } from 'class-validator';
import { ValidationMessages } from 'src/shared/constants/validation-messages';

export class CreateRequest {
  @IsString({ message: ValidationMessages.nameMustBeText })
  public readonly name: string;

  @IsEmail({}, { message: ValidationMessages.emailInvalid })
  public readonly email: string;

  @IsString({ message: ValidationMessages.passwordMustBeText })
  public readonly password: string;
}
