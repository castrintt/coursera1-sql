import {
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { ValidationMessages } from 'src/shared/constants/validation-messages';

export class UpdateJobRequest {
  @IsUUID('4', { message: ValidationMessages.entityIdMustBeUuid })
  public readonly id: string;

  @IsString({ message: ValidationMessages.enterpriseNameMustBeText })
  @MaxLength(150, { message: ValidationMessages.enterpriseNameMaxLength })
  public readonly enterpriseName: string;

  @IsString({ message: ValidationMessages.jobTitleMustBeText })
  @MaxLength(150, { message: ValidationMessages.jobTitleMaxLength })
  public readonly jobTitle: string;

  @IsDateString({}, { message: ValidationMessages.candidatedAtMustBeDate })
  public readonly candidatedAt: string;

  @IsOptional()
  @IsString({ message: ValidationMessages.jobLinkMustBeText })
  @MaxLength(255, { message: ValidationMessages.jobLinkMaxLength })
  public readonly jobLink?: string;

  @IsOptional()
  @IsString({ message: ValidationMessages.observationMustBeText })
  @MaxLength(255, { message: ValidationMessages.observationMaxLength })
  public readonly observation?: string;
}
