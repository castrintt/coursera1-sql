import type { Response } from 'express';
import { AUTH_COOKIE_NAMES, clearAuthCookies } from './auth-cookies';

describe('clearAuthCookies', () => {
  it('should clear access and refresh cookies with paths / and /auth', () => {
    const clearCookie = jest.fn();
    const res = { clearCookie } as unknown as Response;

    clearAuthCookies(res);

    expect(clearCookie).toHaveBeenCalledTimes(2);
    expect(clearCookie).toHaveBeenNthCalledWith(
      1,
      AUTH_COOKIE_NAMES.accessToken,
      expect.objectContaining({ path: '/' }),
    );
    expect(clearCookie).toHaveBeenNthCalledWith(
      2,
      AUTH_COOKIE_NAMES.refreshToken,
      expect.objectContaining({ path: '/auth' }),
    );
  });
});
