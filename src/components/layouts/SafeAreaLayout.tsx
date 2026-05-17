import React from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  children: React.ReactNode;
  edges?: Edge[];
  style?: ViewStyle;
};

export const SafeAreaLayout = ({
  children,
  edges = ['top', 'bottom'],
  style,
}: Props): React.JSX.Element => {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={[styles.base, { backgroundColor: colors.background }, style]}
      edges={edges}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
});
