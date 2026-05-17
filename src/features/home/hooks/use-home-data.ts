import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { homeRepository } from '../repositories/home.repository';
import type { Post } from '../types/home.types';

const HOME_QUERY_KEY = ['home', 'posts'] as const;

export const useHomeData = (): UseQueryResult<Post[], Error> => {
  return useQuery({
    queryKey: HOME_QUERY_KEY,
    queryFn: homeRepository.getPosts,
  });
};
