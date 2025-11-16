import { Image } from "react-konva";
import { contentsMap } from "../globalState/contentsMap";
type Props = {
    id: string
}

export default function ImageContent({ id }: Props) {

    //get image content from contentsMap
    // if no image content, render empty div
    const content = contentsMap.get(id)
    if (!content || !content.img) return null

    return (
        <Image
            key={content.id}
            x={content.x}
            y={content.y}
            width={content.width}
            height={content.height}
            image={content.img}
            draggable

        />
    )
}
