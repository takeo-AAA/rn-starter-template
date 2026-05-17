import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaLayout } from '@/components/layouts/SafeAreaLayout';
import { Text, Button, Card } from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';
import { useThemeStore } from '@/stores/theme.store';
import { spacing } from '@/theme/spacing';
import { useAuth } from '@/hooks/use-auth';

export const SettingsScreen = (): React.JSX.Element => {
  const { colors, isDark } = useTheme();
  const { setMode } = useThemeStore();
  const { logout, isLoading } = useAuth();

  return (
    <SafeAreaLayout>
      <View style={styles.container}>
        <Text variant="h2">設定</Text>

        <Card style={styles.section}>
          <Text variant="h3">テーマ</Text>
          <Text variant="body" color={colors.textSecondary}>
            現在: {isDark ? 'ダーク' : 'ライト'}
          </Text>
          <View style={styles.row}>
            <Button title="ライト" variant="outline" onPress={() => setMode('light')} />
            <Button title="ダーク" variant="outline" onPress={() => setMode('dark')} />
            <Button title="システム" variant="outline" onPress={() => setMode('system')} />
          </View>
        </Card>

        <Button
          title="ログアウト"
          variant="outline"
          isLoading={isLoading}
          onPress={logout}
          fullWidth
        />
      </View>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.xl, gap: spacing.xl },
  section: { gap: spacing.md },
  row: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
});
