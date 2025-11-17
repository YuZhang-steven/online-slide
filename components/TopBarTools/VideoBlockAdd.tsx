import { Clapperboard } from "lucide-react";
import ToolButton from "../ui/ToolButton";
import { ContentType } from "@prisma/client";
import { ContentLocal, contentsMap } from "../globalState/contentsMap";
import { useCurrentPageContentStore } from "../globalState/useCurrentPageContentStore";

type Props = {
    pageID: string
}

export default function VideoBlockAdd({ pageID }: Props) {
    const setVideoContents = useCurrentPageContentStore.getState().setVideoContents;

    function handleClick() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/*';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async () => {
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

                    // Create a video element to get metadata
                    const video = document.createElement('video');
                    video.src = url;
                    video.crossOrigin = "anonymous";
                    video.muted = true;
                    video.playsInline = true;
                    video.autoplay = true;
                    video.loop = true;

                    //create new content and save it in the contesmap when video metadata is loaded
                    video.onloadeddata = () => {
                        const newItem: ContentLocal = {
                            id: "New_Video_" + crypto.randomUUID(),
                            type: ContentType.VIDEO,
                            pageId: pageID,
                            x: 0,
                            y: 0,
                            rotation: 0,
                            width: video.videoWidth,
                            height: video.videoHeight,
                            url: url,
                            text: null,
                        }
                        contentsMap.set(newItem.id, newItem);
                        const currentContents = useCurrentPageContentStore.getState().videoContents;
                        setVideoContents([...currentContents, newItem.id]);
                        video.play().catch(err => console.log("Autoplay block:", err));
                    }
                } catch (error) {
                    console.error("Error processing video upload:", error);
                }
            }
            reader.readAsDataURL(file);
        }
        input.click();
    }

    return (
        <ToolButton
            onClick={handleClick}
        >
            <Clapperboard
                className="text-black"
                size={30}
            />
        </ToolButton>
    )
}
