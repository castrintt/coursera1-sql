import type { CookieOptions, Response } from 'express';

export const AUTH_COOKIE_NAMES = {
  accessToken: 'access_token',
  refreshToken: 'refresh_token',
} as const;

export const ACCESS_TOKEN_MAX_AGE_MS = 15 * 60 * 1000;
export const REFRESH_TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function baseCookieOptions(): Pick<
  CookieOptions,
  'httpOnly' | 'secure' | 'sameSite'
> {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  };
}

export function getAccessTokenSetCookieOptions(
  maxAgeMs: number,
): CookieOptions {
  return {
    ...baseCookieOptions(),
    maxAge: maxAgeMs,
    path: '/',
  };
}

export function getRefreshTokenSetCookieOptions(
  maxAgeMs: number,
): CookieOptions {
  return {
    ...baseCookieOptions(),
    maxAge: maxAgeMs,
    path: '/auth',
  };
}

/** Opções para `clearCookie` devem coincidir com as usadas em `cookie`. */
export function clearAuthCookies(res: Response): void {
  const base = baseCookieOptions();
  res.clearCookie(AUTH_COOKIE_NAMES.accessToken, { ...base, path: '/' });
  res.clearCookie(AUTH_COOKIE_NAMES.refreshToken, { ...base, path: '/auth' });
}
