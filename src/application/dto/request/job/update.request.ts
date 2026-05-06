import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsOptional,
  IsString,
  IsUrl,
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

  @Transform(({ value }) => {
    if (value === null || value === undefined) return undefined;
    if (typeof value !== 'string') return value;
    const trimmed = value.trim();
    return trimmed === '' ? undefined : trimmed;
  })
  @IsOptional()
  @IsUrl(
    {
      protocols: ['https'],
      require_protocol: true,
      require_valid_protocol: true,
    },
    { message: ValidationMessages.jobLinkMustBeValidHttpsUrl },
  )
  @MaxLength(255, { message: ValidationMessages.jobLinkMaxLength })
  public readonly jobLink?: string;

  @IsOptional()
  @IsString({ message: ValidationMessages.observationMustBeText })
  @MaxLength(255, { message: ValidationMessages.observationMaxLength })
  public readonly observation?: string;
}
