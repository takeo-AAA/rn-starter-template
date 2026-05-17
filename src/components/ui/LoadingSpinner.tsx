import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  fullScreen?: boolean;
  size?: 'small' | 'large';
};

export const LoadingSpinner = ({ fullScreen = false, size = 'large' }: Props): React.JSX.Element => {
  const { colors } = useTheme();

  if (fullScreen) {
    return (
      <View style={[styles.fullScreen, { backgroundColor: colors.background }]}>
        <ActivityIndicator size={size} color={colors.primary} />
      </View>
    );
  }

  return <ActivityIndicator size={size} color={colors.primary} />;
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
