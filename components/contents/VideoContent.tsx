import { useEffect, useRef } from "react";
import { contentsMap } from "../globalState/contentsMap"
import { Image, Transformer } from "react-konva";
import Konva from "konva";

type Props = {
    id: string
}


export default function VideoContent({ id }: Props) {
    const videoRef = useRef<Konva.Image | null>(null)
    const transformerRef = useRef<Konva.Transformer | null>(null);

    //get video content from contentsMap
    // if no image content, render empty div
    const content = contentsMap.get(id)

    //handle transformer(resize and rotate) when content changes
    useEffect(() => {
        if (transformerRef.current && videoRef.current) {
            transformerRef.current.nodes([videoRef.current]);
            transformerRef.current.getLayer()?.batchDraw();
        }
    }, [id, content])


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
