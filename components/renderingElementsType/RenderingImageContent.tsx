import ImageContent from "../contents/ImageContent"
import { useCurrentPageContentStore } from "../globalState/useCurrentPageContentStore"


export default function RenderingImageContent() {
    // Get the list of image content IDs for the current page from the global content store
    const imageContentIDs = useCurrentPageContentStore((state) => state.imageContents)

    return (
        <>
            {imageContentIDs.map((id) => (
                <ImageContent key={id} id={id} />
            ))}
        </>
    )
}
