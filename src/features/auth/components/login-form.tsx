import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextInput } from '@/components/ui';
import { spacing } from '@/theme/spacing';
import { loginSchema, type LoginInput } from '../types/auth.types';

type Props = {
  onSubmit: (data: LoginInput) => void;
  isLoading: boolean;
};

export const LoginForm = ({ onSubmit, isLoading }: Props): React.JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            label="メールアドレス"
            placeholder="email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            label="パスワード"
            placeholder="8文字以上"
            secureTextEntry
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={errors.password?.message}
          />
        )}
      />
      <Button
        title="ログイン"
        onPress={handleSubmit(onSubmit)}
        isLoading={isLoading}
        fullWidth
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
});
