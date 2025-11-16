import VideoContent from "../contents/VideoContent"
import { useCurrentPageContentStore } from "../globalState/useCurrentPageContentStore";



export default function RenderingVideoContent() {
    const videoContentIDs = useCurrentPageContentStore((state) => state.videoContents)
    console.log("Rendering Video Contents", videoContentIDs);

    return (
        <>
            {videoContentIDs.map((id) => (
                <VideoContent key={id} id={id} />
            ))}
        </>
    )
}
