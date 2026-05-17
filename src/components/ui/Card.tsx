import React from 'react';
import { View, StyleSheet, type ViewProps } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { spacing, borderRadius } from '@/theme/spacing';
import { shadows } from '@/theme/shadows';

type Props = ViewProps & {
  elevated?: boolean;
};

export const Card = ({ elevated = false, style, children, ...props }: Props): React.JSX.Element => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.base,
        { backgroundColor: colors.surface, borderColor: colors.border },
        elevated ? shadows.md : styles.bordered,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  bordered: {
    borderWidth: 1,
  },
});
