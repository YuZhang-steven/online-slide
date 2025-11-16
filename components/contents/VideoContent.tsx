import { useRef, useState } from "react";
import { contentsMap } from "../globalState/contentsMap"
import { Image, Transformer } from "react-konva";
import Konva from "konva";
import useTransformationHandle from "@/lib/hooks/useTransformationHandle";

type Props = {
    id: string
}


export default function VideoContent({ id }: Props) {
    const videoRef = useRef<Konva.Image | null>(null)
    const transformerRef = useRef<Konva.Transformer | null>(null);

    //get video content from contentsMap
    // if no image content, render empty div
    const [content, setContent] = useState(contentsMap.get(id));

    //handle transformer(resize and rotate) when content changes
    const { handleTransformEnd } = useTransformationHandle({
        id,
        content,
        contentRef: videoRef,
        transformerRef,
        localStateSetter: setContent
    })

    // if no video content, render empty div
    if (!content || !content.video) return null

    return (
        <>
            <Image
                ref={videoRef}
                key={content.id}
                x={content.x}
                y={content.y}
                width={content.width}
                height={content.height}
                image={content.video}
                draggable
                onTransformEnd={handleTransformEnd}
            />
            <Transformer
                ref={transformerRef}
                rotateEnabled={true}
                enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
                boundBoxFunc={(oldBox, newBox) => {
                    // prevent too small size
                    if (newBox.width < 20 || newBox.height < 20) {
                        return oldBox;
                    }
                    return newBox;
                }}
            />
        </>

    )
}
