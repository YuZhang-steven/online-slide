
import { useCurrentPageContents } from '../globalState/useCurrentPageContents'
import TextContent from '../contents/TextContent'


export default function RenderingTextContent() {
    const textContentIDs = useCurrentPageContents((state) => state.textContents)

    return (
        <>
            {textContentIDs.map((id) => (
                <TextContent key={id} id={id} />
            ))}
        </>
    )
}
