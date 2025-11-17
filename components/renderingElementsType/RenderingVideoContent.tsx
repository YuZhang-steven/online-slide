import VideoContent from "../contents/VideoContent"
import { useCurrentPageContentStore } from "../globalState/useCurrentPageContentStore";



export default function RenderingVideoContent() {
    const videoContentIDs = useCurrentPageContentStore((state) => state.videoContents)


    return (
        <>
            {videoContentIDs.map((id) => (
                <VideoContent key={id} id={id} />
            ))}
        </>
    )
}
