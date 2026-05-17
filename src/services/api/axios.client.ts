import axios, {
  type InternalAxiosRequestConfig,
  type AxiosInstance,
  type AxiosError,
} from 'axios';
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
