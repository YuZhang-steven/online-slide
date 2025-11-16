import { Image, Transformer } from "react-konva";
import { contentsMap } from "../globalState/contentsMap";
import { useEffect, useRef } from "react";
import Konva from "konva";
type Props = {
    id: string
}

export default function ImageContent({ id }: Props) {
    const imageRef = useRef<Konva.Image | null>(null)
    const transformerRef = useRef<Konva.Transformer | null>(null);

    //get image content from contentsMap
    // if no image content, render empty div
    const content = contentsMap.get(id)
    if (!content || !content.img) return null


    //handle transformer(resize and rotate) when content changes
    useEffect(() => {
        if (transformerRef.current && imageRef.current) {
            transformerRef.current.nodes([imageRef.current]);
            transformerRef.current.getLayer()?.batchDraw();
        }
    }, [id, content])

    function handleTransformEnd(e: Konva.KonvaEventObject<Event>) {

        console.log("transform end", e);


    }



    return (
        <>
            <Image
                ref={imageRef}
                key={content.id}
                x={content.x}
                y={content.y}
                width={content.width}
                height={content.height}
                image={content.img}
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
