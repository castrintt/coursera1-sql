import { BadRequestException, ParseUUIDPipe } from '@nestjs/common';
import { ValidationMessages } from 'src/shared/constants/validation-messages';

/** ParseUUIDPipe com mensagem de validação em português. */
export const brParseUuidPipe = new ParseUUIDPipe({
  exceptionFactory: () =>
    new BadRequestException(ValidationMessages.entityIdMustBeUuid),
});
