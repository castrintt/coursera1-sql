/** Mensagens de validação class-validator para o cliente (português). */
export const ValidationMessages = {
  emailInvalid: 'Informe um e-mail válido.',
  passwordRequired: 'A senha é obrigatória.',
  passwordMinLength: 'A senha deve ter pelo menos 8 caracteres.',
  passwordMaxLength: 'A senha deve ter no máximo 20 caracteres.',
  nameMustBeText: 'O nome deve ser um texto válido.',
  passwordMustBeText: 'A senha deve ser um texto válido.',
  userIdMustBeUuid: 'O identificador do usuário deve ser um UUID válido.',
  categoryIdMustBeUuid: 'O identificador da categoria deve ser um UUID válido.',
  categoryNameMustBeText: 'O nome da categoria deve ser um texto válido.',
  categoryNameMaxLength:
    'O nome da categoria deve ter no máximo 150 caracteres.',
  entityIdMustBeUuid: 'O identificador deve ser um UUID válido.',
  sortOrderMustBeInteger: 'A ordem deve ser um número inteiro.',
  sortOrderNonNegative: 'A ordem deve ser maior ou igual a zero.',
} as const;
