import { z } from 'zod';

const envSchema = z.object({
  API_BASE_URL: z.string().url(),
  API_TIMEOUT: z.coerce.number().positive(),
  APP_ENV: z.enum(['development', 'staging', 'production']),
});

const _env = {
  API_BASE_URL: process.env.API_BASE_URL,
  API_TIMEOUT: process.env.API_TIMEOUT,
  APP_ENV: process.env.APP_ENV,
};

const parsed = envSchema.safeParse(_env);

if (!parsed.success) {
  throw new Error(
    `Invalid environment variables:\n${JSON.stringify(parsed.error.format(), null, 2)}`,
  );
}

export const env = parsed.data;
export type Env = typeof parsed.data;
