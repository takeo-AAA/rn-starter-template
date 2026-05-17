import { createMMKV } from 'react-native-mmkv';

const mmkv = createMMKV();

export const storage = {
  getString(key: string): string | undefined {
    return mmkv.getString(key);
  },

  setString(key: string, value: string): void {
    try {
      mmkv.set(key, value);
    } catch (e) {
      console.error(`[storage] Failed to set string for key "${key}":`, e);
    }
  },

  getBoolean(key: string): boolean | undefined {
    return mmkv.getBoolean(key);
  },

  setBoolean(key: string, value: boolean): void {
    try {
      mmkv.set(key, value);
    } catch (e) {
      console.error(`[storage] Failed to set boolean for key "${key}":`, e);
    }
  },

  getNumber(key: string): number | undefined {
    return mmkv.getNumber(key);
  },

  setNumber(key: string, value: number): void {
    try {
      mmkv.set(key, value);
    } catch (e) {
      console.error(`[storage] Failed to set number for key "${key}":`, e);
    }
  },

  remove(key: string): boolean {
    return mmkv.remove(key);
  },

  clearAll(): void {
    mmkv.clearAll();
  },

  contains(key: string): boolean {
    return mmkv.contains(key);
  },
} as const;

export const StorageKeys = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  THEME_MODE: 'theme_mode',
  USER_PROFILE: 'user_profile',
} as const;
