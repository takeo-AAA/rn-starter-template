import React from 'react';
import { Text as RNText, StyleSheet, type TextProps, type TextStyle } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { typography } from '@/theme/typography';

type Variant = 'h1' | 'h2' | 'h3' | 'body' | 'bodySmall' | 'caption';

type Props = TextProps & {
  variant?: Variant;
  color?: string;
};

const variantStyles: Record<Variant, TextStyle> = {
  h1: { fontSize: typography.fontSize.xxxl, fontWeight: typography.fontWeight.bold, lineHeight: typography.fontSize.xxxl * 1.2 },
  h2: { fontSize: typography.fontSize.xxl, fontWeight: typography.fontWeight.bold, lineHeight: typography.fontSize.xxl * 1.2 },
  h3: { fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.semibold, lineHeight: typography.fontSize.xl * 1.3 },
  body: { fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.regular, lineHeight: typography.fontSize.md * 1.5 },
  bodySmall: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.regular, lineHeight: typography.fontSize.sm * 1.5 },
  caption: { fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.regular, lineHeight: typography.fontSize.xs * 1.5 },
};

export const Text = ({ variant = 'body', color, style, ...props }: Props): React.JSX.Element => {
  const { colors } = useTheme();
  return (
    <RNText
      style={[styles.base, variantStyles[variant], { color: color ?? colors.text }, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    flexShrink: 1,
  },
});
