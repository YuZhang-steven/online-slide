import VideoContent from "../contents/VideoContent"
import { useCurrentPageContents } from "../globalState/useCurrentPageContents"


export default function RenderingVideoContent() {
    const videoContentIDs = useCurrentPageContents((state) => state.videoContents)
    console.log("Rendering Video Contents", videoContentIDs);

    return (
        <>
            {videoContentIDs.map((id) => (
                <VideoContent key={id} id={id} />
            ))}
        </>
    )
}
