import { apiClient } from '@/services/api/axios.client';
import type { ApiResponse } from '@/services/api/api.types';
import type { AuthTokens, LoginInput, User } from '../types/auth.types';

type LoginResponse = {
  user: User;
  tokens: AuthTokens;
};

export const authRepository = {
  async login(input: LoginInput): Promise<LoginResponse> {
    const { data } = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login', input);
    return data.data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const { data } = await apiClient.post<ApiResponse<AuthTokens>>('/auth/refresh', {
      refreshToken,
    });
    return data.data;
  },
} as const;
