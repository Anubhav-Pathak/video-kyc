import {create} from "zustand";

const usePipelineStore = create((set) => ({
    index: 0,
    question: '',
    type: '',
    prompt: '',
    data: {name: '', dob: '', address: '', income: '', employment: '', aadhar: '', pan: '', profile: '', signature: '', status: 'pending'},
    setIndex: (index) => set({index}),
    setQuestion: (question) => set({question}),
    setType: (type) => set({type}),
    setPrompt: (prompt) => set({prompt}),
    setData: (key, value) => set((state) => ({
      data: { ...state.data, [key]: value, },
    })),
}));

export default usePipelineStore;