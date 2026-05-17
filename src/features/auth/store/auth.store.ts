import { create } from 'zustand';
import { storage, StorageKeys } from '@/utils/storage';
import type { User, AuthState } from '../types/auth.types';

type AuthActions = {
  setAuthenticated: (user: User, accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
  hydrate: () => void;
};

export const useAuthStore = create<AuthState & AuthActions>(set => ({
  user: null,
  isAuthenticated: false,
  isHydrated: false,

  hydrate: () => {
    const token = storage.getString(StorageKeys.AUTH_TOKEN);
    const userJson = storage.getString(StorageKeys.USER_PROFILE);
    const user: User | null = userJson ? (JSON.parse(userJson) as User) : null;
    set({ isAuthenticated: !!token && !!user, user, isHydrated: true });
  },

  setAuthenticated: (user: User, accessToken: string, refreshToken: string) => {
    storage.setString(StorageKeys.AUTH_TOKEN, accessToken);
    storage.setString(StorageKeys.REFRESH_TOKEN, refreshToken);
    storage.setString(StorageKeys.USER_PROFILE, JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  clearAuth: () => {
    storage.remove(StorageKeys.AUTH_TOKEN);
    storage.remove(StorageKeys.REFRESH_TOKEN);
    storage.remove(StorageKeys.USER_PROFILE);
    set({ user: null, isAuthenticated: false });
  },
}));
