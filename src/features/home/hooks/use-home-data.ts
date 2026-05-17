import { useQuery } from '@tanstack/react-query';
import { homeRepository } from '../repositories/home.repository';

const HOME_QUERY_KEY = ['home', 'posts'] as const;

export const useHomeData = () => {
  return useQuery({
    queryKey: HOME_QUERY_KEY,
    queryFn: homeRepository.getPosts,
  });
};
