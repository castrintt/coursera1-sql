import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { ValidationMessages } from 'src/shared/constants/validation-messages';

export class CreateCategoryRequest {
  @IsString({ message: ValidationMessages.categoryNameMustBeText })
  @MaxLength(150, { message: ValidationMessages.categoryNameMaxLength })
  public readonly name: string;

  @IsOptional()
  @IsInt({ message: ValidationMessages.sortOrderMustBeInteger })
  @Min(0, { message: ValidationMessages.sortOrderNonNegative })
  public readonly order?: number;
}
