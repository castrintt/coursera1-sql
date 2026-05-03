/**
 * Mensagens de erro expostas em respostas HTTP (exceptions NestJS).
 */
export const ApiErrorMessages = {
  auth: {
    invalidCredentials: 'E-mail ou senha incorretos.',
    unauthorized: 'Não autorizado. Faça login novamente.',
    refreshTokenMissing: 'Token de atualização não informado.',
    refreshTokenInvalidOrExpired: 'Token de atualização inválido ou expirado.',
    sessionInvalid: 'Sessão inválida.',
  },
  user: {
    notFoundForEmail: 'Nenhum usuário encontrado para o e-mail informado.',
    notFoundForId: (userId: string) =>
      `Nenhum usuário encontrado com o id: ${userId}`,
  },
  category: {
    notFoundForId: (categoryId: string) =>
      `Nenhuma categoria encontrada com o id: ${categoryId}`,
  },
  job: {
    notFoundForId: (jobId: string) =>
      `Nenhum job encontrado com o id: ${jobId}`,
  },
  registration: {
    ambiguousEmailResponse:
      'Se este e-mail não estiver cadastrado, enviaremos um link em breve',
    duplicateEmailOnUpdate: 'Já existe um usuário cadastrado com este e-mail.',
  },
  environment: {
    jwtSecretMinLength:
      'JWT_SECRET deve ter no mínimo 16 caracteres. Defina a variável no .env ou no ambiente do container.',
  },
} as const;
