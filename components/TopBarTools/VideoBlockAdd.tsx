import { Clapperboard } from "lucide-react";
import { useCurrentPageContents } from "../globalState/useCurrentPageContents";
import ToolButton from "../ui/ToolButton";
import { ContentType } from "@prisma/client";
import { ContentLocal, contentsMap } from "../globalState/contentsMap";


export default function VideoBlockAdd() {
    const setVideoContents = useCurrentPageContents.getState().setVideoContents;

    function handleClick() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/*';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            const url = URL.createObjectURL(file);

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
                    pageId: "0",
                    x: 0,
                    y: 0,
                    width: video.videoWidth,
                    height: video.videoHeight,
                    url: url,
                    text: null,
                    video: video
                }
                video.play().catch(err => console.log("Autoplay block:", err));
                contentsMap.set(newItem.id, newItem);

                const currentContents = useCurrentPageContents.getState().videoContents;
                setVideoContents([...currentContents, newItem.id]);
            }



        }
        input.click();
        console.log("Add Video Block", contentsMap)

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
