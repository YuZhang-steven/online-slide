import Konva from "konva";
import { create } from "zustand";

type ItemSelectInput = {
    id: string | null;
    ref: React.RefObject<Konva.Node | null> | null;
}
type CurrentSelectedItemState = {
    currentSelectedItemID: string | null;
    currentSelectedItemRef: React.RefObject<Konva.Node | null> | null;
    setCurrentSelectedItem: ({ id, ref }: ItemSelectInput) => void;
}



export const useCurrentSelectedItem = create<CurrentSelectedItemState>((set) => ({
    currentSelectedItemID: null,
    currentSelectedItemRef: null,
    setCurrentSelectedItem: ({ id, ref }: ItemSelectInput) => {
        set({
            currentSelectedItemID: id,
            currentSelectedItemRef: ref
        })
    },
}));