import Konva from "konva";
import { create } from "zustand";

type ItemSelectInput = {
    id: string;
    ref: React.RefObject<Konva.Node | null>;
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
        console.log("Setting current selected item ID to:", id);

        set({
            currentSelectedItemID: id,
            currentSelectedItemRef: ref
        })
    },
}));