import React, { useState } from 'react';
import {
  TextInput as RNTextInput,
  View,
  StyleSheet,
  type TextInputProps,
} from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { spacing, borderRadius } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { Text } from './Text';

type Props = TextInputProps & {
  label?: string;
  error?: string;
};

export const TextInput = ({ label, error, style, ...props }: Props): React.JSX.Element => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error
    ? colors.error
    : isFocused
    ? colors.borderFocus
    : colors.border;

  return (
    <View style={styles.container}>
      {label ? (
        <Text variant="bodySmall" color={colors.textSecondary} style={styles.label}>
          {label}
        </Text>
      ) : null}
      <RNTextInput
        style={[
          styles.input,
          {
            borderColor,
            backgroundColor: colors.surface,
            color: colors.text,
            fontSize: typography.fontSize.md,
          },
          style,
        ]}
        placeholderTextColor={colors.textDisabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {error ? (
        <Text variant="caption" color={colors.error} style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  label: {
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
  },
  error: {
    marginTop: 2,
  },
});
