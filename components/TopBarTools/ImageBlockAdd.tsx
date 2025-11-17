import { Image } from "lucide-react";
import ToolButton from "../ui/ToolButton";
import { ContentLocal, contentsMap } from "../globalState/contentsMap";
import { ContentType } from "@prisma/client";
import { useCurrentPageContentStore } from "../globalState/useCurrentPageContentStore";

type Props = {
    pageID: string
}

export default function ImageBlockAdd({ pageID }: Props) {
    const setImageContents = useCurrentPageContentStore.getState().setImageContents;

    function handleClick() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            const reader = new window.FileReader();
            reader.onload = async () => {
                const img = new window.Image();
                img.src = reader.result as string;
                img.onload = async () => {
                    try {
                        const fileData = (reader.result as string).split(',')[1];

                        //upload to R2
                        const res = await fetch('/api/upload', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                name: `${crypto.randomUUID()}_${file.name}`,
                                type: file.type,
                                data: fileData
                            })
                        })
                        if (!res.ok) {
                            const json = await res.json().catch(() => ({}));
                            console.error("Failed to upload image to R2:", json);
                            return;
                        }
                        const { url } = await res.json();
                        console.log("Image uploaded to R2 at URL:", url);

                        const newItem: ContentLocal = {
                            id: "New_Image_" + crypto.randomUUID(),
                            type: ContentType.IMAGE,
                            pageId: pageID,
                            x: 0,
                            y: 0,
                            width: img.width,
                            height: img.height,
                            rotation: 0,
                            url: url,
                            text: null,
                        }
                        contentsMap.set(newItem.id, newItem);
                        const currentContents = useCurrentPageContentStore.getState().imageContents;
                        setImageContents([...currentContents, newItem.id]);
                    } catch (error) {
                        console.error("Error processing image upload:", error);
                    }
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
