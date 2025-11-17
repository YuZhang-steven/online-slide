import { Image, Transformer } from "react-konva";
import { contentsMap } from "../globalState/contentsMap";
import { useRef, useState } from "react";
import Konva from "konva";
import useTransformationHandle from "@/lib/hooks/useTransformationHandle";
import useImage from "use-image";

type Props = {
    id: string
}

export default function ImageContent({ id }: Props) {
    const imageRef = useRef<Konva.Image | null>(null)
    const transformerRef = useRef<Konva.Transformer | null>(null);

    //get image content from contentsMap
    const [content, setContent] = useState(contentsMap.get(id));


    // Load image using the URL
    const [img] = useImage(content?.url || "", "anonymous");
    //handle transformer(resize and rotate) when content changes
    const { handleTransformEnd, handleDragEnd } = useTransformationHandle({
        id,
        content,
        contentRef: imageRef,
        transformerRef,
        localStateSetter: setContent,
        loadTag: img
    })


    // if no image content, render empty div
    if (!content || !img) return null
    return (
        <>
            <Image
                ref={imageRef}
                key={content.id}
                x={content.x}
                y={content.y}
                width={content.width}
                height={content.height}
                image={img}
                draggable
                onTransformEnd={handleTransformEnd}
                onDragEnd={handleDragEnd}
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
