import { Trash2 } from "lucide-react";
import ToolButton from "../ui/ToolButton";
import { useCurrentSelectedItem } from "../globalState/useCurrentSelectedItem";
import { contentsMap } from "../globalState/contentsMap";
import { useCurrentPageContentStore } from "../globalState/useCurrentPageContentStore";
import { deletedContentSet } from "../globalState/deletedContentSet";

export default function DeleteBlock() {
    const currentSelectedID = useCurrentSelectedItem((state) => state.currentSelectedItemID);
    const setCurrentSelectedItem = useCurrentSelectedItem.getState().setCurrentSelectedItem;

    const setTextArr = useCurrentPageContentStore.getState().setTextContents;
    const setImageArr = useCurrentPageContentStore.getState().setImageContents;
    const setVideoArr = useCurrentPageContentStore.getState().setVideoContents;

    const getTextArr = useCurrentPageContentStore.getState().textContents;
    const getImageArr = useCurrentPageContentStore.getState().imageContents;
    const getVideoArr = useCurrentPageContentStore.getState().videoContents;

    function handleClick() {

        const item = contentsMap.get(currentSelectedID!);
        if (!item) return;
        const type = item.type;

        //update current rendering content list
        let newArr: string[] = []
        switch (type) {
            case "TEXT":
                newArr = getTextArr.filter((id) => id !== item.id);
                setTextArr(newArr);

            case "IMAGE":
                newArr = getImageArr.filter((id) => id !== item.id);
                setImageArr(newArr);
            case "VIDEO":
                newArr = getVideoArr.filter((id) => id !== item.id);
                setVideoArr(newArr);
            default:
                break;
        }

        //remove from global contents map and add to deleted set


        deletedContentSet.add(item);
        console.log("deletedContentSet:", deletedContentSet.size);

        const deleted = contentsMap.delete(currentSelectedID!);
        if (deleted) {
            //clear selection
            setCurrentSelectedItem({ id: null, ref: null });
        }
    }
    if (!currentSelectedID) {
        return null;
    }
    return (
        <ToolButton
            onClick={handleClick}
        >
            <Trash2
                className="text-black"
                size={30}
            />
        </ToolButton>
    )
}

