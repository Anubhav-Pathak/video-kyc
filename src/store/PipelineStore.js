import {create} from "zustand";

const usePipelineStore = create((set) => ({
    index: 0,
    question: '',
    prompt: '',
    setIndex: (index) => set({index}),
    setPrompt: (prompt) => set({prompt}),
    setQuestion: (question) => set({question}),
}));

export default usePipelineStore;