import { create } from 'zustand';
import { storage, StorageKeys } from '@/utils/storage';

type ThemeMode = 'light' | 'dark' | 'system';

type ThemeState = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

export const useThemeStore = create<ThemeState>(set => ({
  mode: (storage.getString(StorageKeys.THEME_MODE) as ThemeMode | undefined) ?? 'system',
  setMode: (mode: ThemeMode) => {
    storage.setString(StorageKeys.THEME_MODE, mode);
    set({ mode });
  },
}));
