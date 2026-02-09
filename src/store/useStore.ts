import { create } from 'zustand';

export enum AppStage {
  IDEA = 0,
  CODE = 1,
  MOTION = 2,
  POLISH = 3,
  PRODUCT = 4
}

interface AppState {
  currentStage: AppStage;
  setStage: (stage: AppStage) => void;
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export const useStore = create<AppState>((set) => ({
  currentStage: AppStage.IDEA,
  setStage: (stage) => set({ currentStage: stage }),
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));