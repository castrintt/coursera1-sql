import { IsEmail, IsString, IsUUID } from 'class-validator';
import { ValidationMessages } from 'src/shared/constants/validation-messages';

export class UpdateUserRequest {
  @IsUUID('4', { message: ValidationMessages.entityIdMustBeUuid })
  public readonly id: string;

  @IsString({ message: ValidationMessages.nameMustBeText })
  public readonly name: string;

  @IsEmail({}, { message: ValidationMessages.emailInvalid })
  public readonly email: string;
}
