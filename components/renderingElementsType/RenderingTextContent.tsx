

import TextContent from '../contents/TextContent'
import { useCurrentPageContentStore } from '../globalState/useCurrentPageContentStore'


export default function RenderingTextContent() {
    // Get text content IDs for the current page
    const textContentIDs = useCurrentPageContentStore((state) => state.textContents)

    return (
        <>
            {textContentIDs.map((id) => (
                <TextContent key={id} id={id} />
            ))}
        </>
    )
}
