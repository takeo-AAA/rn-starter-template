import axios, { type InternalAxiosRequestConfig, type AxiosInstance, type AxiosError } from 'axios';
import { storage, StorageKeys } from '@/utils/storage';
import { logger } from '@/utils/logger';
import type { ApiError } from './api.types';

const BASE_URL = process.env.API_BASE_URL ?? '';
const TIMEOUT = Number(process.env.API_TIMEOUT ?? 10000);

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Dev-only mock: intercept auth endpoints that don't exist on jsonplaceholder
if (__DEV__) {
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const url = config.url ?? '';
      if (url === '/auth/login') {
        config.adapter = async () => ({
          data: {
            data: {
              user: { id: '1', email: 'test@example.com', name: 'Test User' },
              tokens: { accessToken: 'mock-access-token', refreshToken: 'mock-refresh-token' },
            },
          },
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        });
      }
      if (url === '/auth/logout') {
        config.adapter = async () => ({
          data: { data: null },
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        });
      }
      if (url === '/posts') {
        config.adapter = async () => ({
          data: [
            {
              id: '1',
              title: 'Starter Template Demo',
              body: 'React Native 0.85.3 with New Architecture',
              userId: '1',
            },
            {
              id: '2',
              title: 'TypeScript Strict Mode',
              body: 'Zero errors, full type safety across the codebase',
              userId: '1',
            },
            {
              id: '3',
              title: 'TanStack Query v5',
              body: 'Server state management with stale-while-revalidate',
              userId: '1',
            },
            {
              id: '4',
              title: 'Zustand v5 Stores',
              body: 'Minimal client state with MMKV persistence',
              userId: '1',
            },
            {
              id: '5',
              title: 'React Navigation v7',
              body: 'Type-safe navigation with typed param lists',
              userId: '1',
            },
          ],
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        });
      }
      return config;
    },
  );
}

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = storage.getString(StorageKeys.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    logger.debug(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error: unknown) => {
    logger.error('[API] Request error', error);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  response => {
    logger.debug(`[API] Response ${response.status} ${response.config.url}`);
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    const status = error.response?.status;
    logger.error(`[API] Response error ${status}`, error.response?.data);

    if (status === 401) {
      storage.remove(StorageKeys.AUTH_TOKEN);
      storage.remove(StorageKeys.REFRESH_TOKEN);
    }

    return Promise.reject(error);
  },
);
