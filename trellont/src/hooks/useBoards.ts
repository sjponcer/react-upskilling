import { useQuery } from '@tanstack/react-query';
import { fetchBoards, type Board } from '../services/api';

export const useBoards = () => {
  return useQuery<Board[], Error>({
    queryKey: ['boards'],
    queryFn: fetchBoards,
  });
};

