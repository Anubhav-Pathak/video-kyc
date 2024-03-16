import {create} from "zustand";

const useDataStore = create((set) => ({
    data: {name: '', dob: '', address: '', income: '', employment: '', aadhar: '', pan: '', profile: '', signature: '', status: 'pending'},
    setData: (key, value) => set((state) => ({
      data: { ...state.data, [key]: value, },
    })),
}));

export default useDataStore;