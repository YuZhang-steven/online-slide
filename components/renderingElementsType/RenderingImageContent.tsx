import ImageContent from "../contents/ImageContent"
import { useCurrentPageContentStore } from "../globalState/useCurrentPageContentStore"


export default function RenderingImageContent() {
    const imageContentIDs = useCurrentPageContentStore((state) => state.imageContents)

    return (
        <>
            {imageContentIDs.map((id) => (
                <ImageContent key={id} id={id} />
            ))}
        </>
    )
}
