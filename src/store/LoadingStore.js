import { create } from 'zustand';

const useLoadingStore = create((set) => ({
  loadingStates: {},
  setLoadingState: (key, isLoading) =>
    set((state) => ({
      loadingStates: {
        ...state.loadingStates,
        [key]: isLoading,
      },
    })),
}));

export default useLoadingStore;
