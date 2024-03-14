import { create } from 'zustand';

const useChatStore = create((set) => ({
    messages: [],
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] }))
}));

export default useChatStore;
