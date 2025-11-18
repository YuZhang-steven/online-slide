import { create } from "zustand";

/**
 * Global state to track the current page in the editor.
 * Stores the page ID and its index in the presentation.
 */
type CurrentPageState = {
    currentPageID: string | null;
    currentPageIndex: number | null;
    setCurrentPageID: (id: string) => void;
    setCurrentPageIndex: (index: number) => void;

}

export const useCurrentPageStore = create<CurrentPageState>((set) => ({
    currentPageID: null,
    currentPageIndex: null,
    setCurrentPageID: (id: string) => set({ currentPageID: id }),
    setCurrentPageIndex: (index: number) => set({ currentPageIndex: index }),

}));