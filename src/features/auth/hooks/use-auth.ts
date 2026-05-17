import { useState } from 'react';
import { useAuthStore } from '../store/auth.store';
import { authRepository } from '../repositories/auth.repository';
import { logger } from '@/utils/logger';
import type { LoginInput } from '../types/auth.types';

type UseAuthReturn = {
  isLoading: boolean;
  error: string | null;
  login: (input: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuth = (): UseAuthReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuthenticated, clearAuth } = useAuthStore();

  const login = async (input: LoginInput): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const { user, tokens } = await authRepository.login(input);
      setAuthenticated(user, tokens.accessToken, tokens.refreshToken);
    } catch (e) {
      logger.error('[useAuth] login failed', e);
      setError('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authRepository.logout();
    } catch (e) {
      logger.warn('[useAuth] logout API failed, clearing local state', e);
    } finally {
      clearAuth();
      setIsLoading(false);
    }
  };

  return { isLoading, error, login, logout };
};
