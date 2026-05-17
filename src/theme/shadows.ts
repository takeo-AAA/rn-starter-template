import { Platform } from 'react-native';

type Shadow = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};

const createShadow = (elevation: number): Shadow => ({
  shadowColor: '#000',
  shadowOffset: { width: 0, height: elevation / 2 },
  shadowOpacity: 0.1 + elevation * 0.02,
  shadowRadius: elevation,
  elevation: Platform.OS === 'android' ? elevation : 0,
});

export const shadows = {
  sm: createShadow(2),
  md: createShadow(4),
  lg: createShadow(8),
  xl: createShadow(16),
} as const;
