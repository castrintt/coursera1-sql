import { IsUUID } from 'class-validator';
import { ValidationMessages } from 'src/shared/constants/validation-messages';

export class SwitchJobCategoryRequest {
  @IsUUID('4', { message: ValidationMessages.entityIdMustBeUuid })
  public readonly id: string;

  @IsUUID('4', { message: ValidationMessages.categoryIdMustBeUuid })
  public readonly categoryId: string;
}
