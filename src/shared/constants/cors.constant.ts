export const CORS_OPTIONS = {
  origin: [process.env.FRONTEND_URL ?? 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Cookie'],
} as any;
