import { useColorScheme } from 'react-native';
import { useThemeStore } from '@/stores/theme.store';
import { lightColors, darkColors } from '@/theme/colors';
import type { LightColors } from '@/theme/colors';

type UseThemeReturn = {
  colors: LightColors;
  isDark: boolean;
};

export const useTheme = (): UseThemeReturn => {
  const systemScheme = useColorScheme();
  const { mode } = useThemeStore();

  const isDark =
    mode === 'dark' || (mode === 'system' && systemScheme === 'dark');

  return {
    colors: isDark ? darkColors : lightColors,
    isDark,
  };
};
