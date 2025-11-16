import { create } from "zustand";

type CurrentPageState = {
    currentPageID: string | null;
    setCurrentPageID: (id: string) => void;

}

export const useCurrentPageStore = create<CurrentPageState>((set) => ({
    currentPageID: null,
    setCurrentPageID: (id: string) => set({ currentPageID: id }),
}));