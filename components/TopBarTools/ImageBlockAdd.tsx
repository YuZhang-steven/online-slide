import { Image } from "lucide-react";
import ToolButton from "../ui/ToolButton";
import { ContentLocal, contentsMap } from "../globalState/contentsMap";
import { ContentType } from "@prisma/client";
import { useCurrentPageContents } from "../globalState/useCurrentPageContents";


export default function ImageBlockAdd() {
    const setImageContents = useCurrentPageContents.getState().setImageContents;

    function handleClick() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            const reader = new window.FileReader();
            reader.onload = () => {
                const img = new window.Image();
                img.src = reader.result as string;
                img.onload = () => {
                    const newItem: ContentLocal = {
                        id: "New_Image_" + crypto.randomUUID(),
                        type: ContentType.IMAGE,
                        pageId: "0",
                        x: 0,
                        y: 0,
                        width: img.width,
                        height: img.height,
                        url: null,
                        text: null,
                        img: img
                    }
                    contentsMap.set(newItem.id, newItem);
                    const currentContents = useCurrentPageContents.getState().imageContents;
                    setImageContents([...currentContents, newItem.id]);
                }
            };
            reader.readAsDataURL(file);
        };
        input.click();


    }

    return (
        <ToolButton
            onClick={handleClick}
        >
            <Image
                className="text-black"
                size={30}
            />
        </ToolButton>
    )
}
