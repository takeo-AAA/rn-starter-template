import { createMMKV } from 'react-native-mmkv';

const mmkv = createMMKV();

const set = (key: string, value: string | boolean | number): void => {
  try {
    mmkv.set(key, value);
  } catch (e) {
    console.error(`[storage] Failed to set value for key "${key}":`, e);
  }
};

export const storage = {
  getString(key: string): string | undefined {
    return mmkv.getString(key);
  },

  setString(key: string, value: string): void {
    set(key, value);
  },

  getBoolean(key: string): boolean | undefined {
    return mmkv.getBoolean(key);
  },

  setBoolean(key: string, value: boolean): void {
    set(key, value);
  },

  getNumber(key: string): number | undefined {
    return mmkv.getNumber(key);
  },

  setNumber(key: string, value: number): void {
    set(key, value);
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
