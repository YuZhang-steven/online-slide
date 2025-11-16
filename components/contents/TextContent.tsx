
import { Text } from 'react-konva'
import { contentsMap } from '../globalState/contentsMap'
type Props = {
    id: string
}

export default function TextContent({ id }: Props) {
    //get text content from contentsMap
    const content = contentsMap.get(id)

    //render empty div if no text content
    if (!content) return null

    return (
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
    )
}
