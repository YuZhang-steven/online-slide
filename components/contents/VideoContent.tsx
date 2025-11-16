import { contentsMap } from "../globalState/contentsMap"
import { Image } from "react-konva";

type Props = {
    id: string
}


export default function VideoContent({ id }: Props) {

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
