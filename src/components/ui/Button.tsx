import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  type TouchableOpacityProps,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { spacing, borderRadius, opacity, minTouchTarget } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { Text } from './Text';

type Variant = 'primary' | 'outline' | 'ghost';

type Props = TouchableOpacityProps & {
  title: string;
  variant?: Variant;
  isLoading?: boolean;
  fullWidth?: boolean;
};

export const Button = ({
  title,
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  disabled,
  style,
  ...props
}: Props): React.JSX.Element => {
  const { colors } = useTheme();
  const isDisabled = disabled || isLoading;

  const containerStyle: ViewStyle = {
    backgroundColor: variant === 'primary' ? colors.primary : colors.transparent,
    borderWidth: variant === 'outline' ? 1 : 0,
    borderColor: variant === 'outline' ? colors.primary : colors.transparent,
    opacity: isDisabled ? opacity.disabled : opacity.active,
    alignSelf: fullWidth ? 'stretch' : 'auto',
  };

  const textColor = variant === 'primary' ? colors.textInverse : colors.primary;

  return (
    <TouchableOpacity
      style={[styles.base, containerStyle, style]}
      disabled={isDisabled}
      activeOpacity={opacity.pressed}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <Text variant="body" color={textColor} style={styles.label}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: minTouchTarget,
  },
  label: {
    fontWeight: typography.fontWeight.semibold,
  },
});
