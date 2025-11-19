import { create } from "zustand";

type CurrentSelectedItemState = {
    currentSelectedItemID: string | null;
    setCurrentSelectedItemID: (id: string | null) => void;
}

export const useCurrentSelectedItem = create<CurrentSelectedItemState>((set) => ({
    currentSelectedItemID: null,
    setCurrentSelectedItemID: (id: string | null) => set({ currentSelectedItemID: id }),
}));