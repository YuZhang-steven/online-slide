import ImageContent from "../contents/ImageContent"
import { useCurrentPageContents } from "../globalState/useCurrentPageContents"

export default function RenderingImageContent() {
    const imageContentIDs = useCurrentPageContents((state) => state.imageContents)

    return (
        <>
            {imageContentIDs.map((id) => (
                <ImageContent key={id} id={id} />
            ))}
        </>
    )
}
