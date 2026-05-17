export const palette = {
  primary50: '#EEF2FF',
  primary100: '#E0E7FF',
  primary500: '#6366F1',
  primary600: '#4F46E5',
  primary700: '#4338CA',

  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  red500: '#EF4444',
  red600: '#DC2626',
  green500: '#22C55E',
  green600: '#16A34A',
  yellow500: '#EAB308',

  white: '#FFFFFF',
  black: '#000000',
} as const;

export type ColorTokens = {
  background: string;
  backgroundSecondary: string;
  surface: string;
  surfaceSecondary: string;
  primary: string;
  primaryLight: string;
  text: string;
  textSecondary: string;
  textDisabled: string;
  textInverse: string;
  border: string;
  borderFocus: string;
  error: string;
  success: string;
  warning: string;
  tabBar: string;
  tabBarBorder: string;
  tabBarActive: string;
  tabBarInactive: string;
  transparent: string;
};

export type LightColors = ColorTokens;
export type DarkColors = ColorTokens;

export const lightColors: ColorTokens = {
  background: palette.white,
  backgroundSecondary: palette.gray50,
  surface: palette.white,
  surfaceSecondary: palette.gray100,
  primary: palette.primary600,
  primaryLight: palette.primary500,
  text: palette.gray900,
  textSecondary: palette.gray500,
  textDisabled: palette.gray300,
  textInverse: palette.white,
  border: palette.gray200,
  borderFocus: palette.primary500,
  error: palette.red600,
  success: palette.green600,
  warning: palette.yellow500,
  tabBar: palette.white,
  tabBarBorder: palette.gray200,
  tabBarActive: palette.primary600,
  tabBarInactive: palette.gray400,
  transparent: 'transparent',
};

export const darkColors: ColorTokens = {
  background: palette.gray900,
  backgroundSecondary: palette.gray800,
  surface: palette.gray800,
  surfaceSecondary: palette.gray700,
  primary: palette.primary500,
  primaryLight: palette.primary100,
  text: palette.white,
  textSecondary: palette.gray400,
  textDisabled: palette.gray600,
  textInverse: palette.gray900,
  border: palette.gray700,
  borderFocus: palette.primary500,
  error: palette.red500,
  success: palette.green500,
  warning: palette.yellow500,
  tabBar: palette.gray900,
  tabBarBorder: palette.gray700,
  tabBarActive: palette.primary500,
  tabBarInactive: palette.gray500,
  transparent: 'transparent',
};
