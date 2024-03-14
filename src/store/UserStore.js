import {create} from "zustand";

const useUserStore = create((set) => ({
    preference: {slow: false, lang:'en', audio: false, video: false},
    changePreference: (preference) => set({preference}),
}));

export default useUserStore;