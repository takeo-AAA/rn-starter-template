import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaLayout } from '@/components/layouts/SafeAreaLayout';
import { Text } from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';
import { spacing } from '@/theme/spacing';
import { LoginForm } from '../components/login-form';
import { useAuth } from '../hooks/use-auth';
import type { LoginInput } from '../types/auth.types';

export const LoginScreen = (): React.JSX.Element => {
  const { colors } = useTheme();
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (data: LoginInput): Promise<void> => {
    await login(data);
  };

  return (
    <SafeAreaLayout>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text variant="h1">ログイン</Text>
            <Text variant="body" color={colors.textSecondary}>
              アカウントにサインインしてください
            </Text>
          </View>
          {error ? (
            <Text variant="bodySmall" color={colors.error}>
              {error}
            </Text>
          ) : null}
          <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    flexGrow: 1,
    padding: spacing.xl,
    gap: spacing.xl,
    justifyContent: 'center',
  },
  header: {
    gap: spacing.sm,
  },
});
