
import { Text } from 'react-konva'
import { useCurrentPageContents } from '../globalState/useCurrentPageContents'
import { useEffect, useState } from 'react'
import { ContentLocal, contentsMap } from '../globalState/contentsMap'


export default function RenderingTextContent() {
    const textContentIDs = useCurrentPageContents((state) => state.textContents)
    const [textContents, setTextContents] = useState<ContentLocal[]>([])
    useEffect(() => {

        const newContents: ContentLocal[] = []
        textContentIDs.forEach((contentId) => {
            const content = contentsMap.get(contentId)
            if (content) {
                newContents.push(content)
            }
        })
        setTextContents(newContents)

    }, [textContentIDs])
    return (
        <>
            {textContents.map((content) => (

                <Text
                    key={content.id}
                    x={content.x}
                    y={content.y}
                    width={content.width}
                    height={content.height}
                    text={content.text || "Sample Text"}
                    fontSize={24}
                    fill="black"
                    draggable
                />

            ))}
        </>
    )
}
