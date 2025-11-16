
import { create } from "zustand";
type CurrentPageContentsState = {
    textContents: string[];
    imageContents: string[];
    videoContents: string[];

}

export const useCurrentPageContents = create<CurrentPageContentsState>((set) => ({
    textContents: [],
    imageContents: [],
    videoContents: [],
    setTextContents: (texts: string[]) => set({ textContents: texts }),
    setImageContents: (images: string[]) => set({ imageContents: images }),
    setVideoContents: (videos: string[]) => set({ videoContents: videos }),

}));
