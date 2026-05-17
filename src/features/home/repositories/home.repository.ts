import { apiClient } from '@/services/api/axios.client';
import type { Post } from '../types/home.types';

export const homeRepository = {
  async getPosts(): Promise<Post[]> {
    const { data } = await apiClient.get<Post[]>('/posts');
    return data;
  },
} as const;
