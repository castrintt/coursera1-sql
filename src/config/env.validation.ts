import { plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  @MinLength(16, {
    message:
      'JWT_SECRET must be a string with at least 16 characters. Set it in .env or the container environment.',
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
