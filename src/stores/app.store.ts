import { create } from 'zustand';

type AppState = {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useAppStore = create<AppState>(set => ({
  isLoading: false,
  setLoading: (isLoading: boolean) => set({ isLoading }),
}));
