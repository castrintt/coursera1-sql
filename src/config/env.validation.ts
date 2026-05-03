import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, validateSync } from 'class-validator';
import { ApiErrorMessages } from 'src/shared/constants/api-error-messages';

class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  @MinLength(16, {
    message: ApiErrorMessages.environment.jwtSecretMinLength,
  })
  JWT_SECRET!: string;
}

export function validateEnv(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validated = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validated, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    const messages = errors
      .map((e) => Object.values(e.constraints ?? {}).join(', '))
      .join('; ');
    throw new Error(`Configuração de ambiente inválida: ${messages}`);
  }
  return validated;
}
