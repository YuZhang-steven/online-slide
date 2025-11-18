
import { create } from "zustand";

/**
 * Global state to track the element IDs currently rendered on the canvas.
 * We separate IDs by type: text, image, video.
 */
type CurrentPageContentsState = {
    textContents: string[];
    imageContents: string[];
    videoContents: string[];
    setTextContents: (texts: string[]) => void;
    setImageContents: (images: string[]) => void;
    setVideoContents: (videos: string[]) => void;

}

export const useCurrentPageContentStore = create<CurrentPageContentsState>((set) => ({
    textContents: [],
    imageContents: [],
    videoContents: [],
    setTextContents: (texts: string[]) => set({ textContents: texts }),
    setImageContents: (images: string[]) => set({ imageContents: images }),
    setVideoContents: (videos: string[]) => set({ videoContents: videos }),

}));
