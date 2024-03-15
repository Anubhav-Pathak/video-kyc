import {create} from "zustand";

const usePipelineStore = create((set) => ({
    question: {type:'', question: '', prompt: '', index:0},
    data: {name: '', dob: '', address: '', income: '', employment: '', aadhar: '', pan: '', profile: '', signature: '', status: 'pending'},
    setQuestion: (key, isLoading) => set((state) => ({
      loadingStates: { ...state.loadingStates, [key]: isLoading, },
    })),
    setData: (key, isLoading) => set((state) => ({
      loadingStates: { ...state.loadingStates, [key]: isLoading, },
    })),
}));

export default usePipelineStore;