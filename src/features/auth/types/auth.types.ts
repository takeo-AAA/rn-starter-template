import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email({ error: 'Invalid email address' }),
  password: z.string().min(8, { error: 'Password must be at least 8 characters' }),
});

export type LoginInput = z.infer<typeof loginSchema>;

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
};
