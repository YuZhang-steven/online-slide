
import { Text, Transformer } from 'react-konva'
import { contentsMap } from '../globalState/contentsMap'
import { useEffect, useRef, useState } from 'react';
import Konva from 'konva';

type Props = {
    id: string
}

export default function TextContent({ id }: Props) {
    const textRef = useRef<Konva.Text | null>(null)
    const transformerRef = useRef<Konva.Transformer | null>(null);

    //get text content from contentsMap
    const [content, setContent] = useState(contentsMap.get(id));

    //handle transformer(resize and rotate) when content changes
    useEffect(() => {
        if (transformerRef.current && textRef.current) {
            transformerRef.current.nodes([textRef.current]);
            transformerRef.current.getLayer()?.batchDraw();
        }
    }, [id, content])

    // update the contentsMap when transform ends
    function handleTransformEnd(e: Konva.KonvaEventObject<Event>) {

        const node = textRef.current;

        if (node && content) {
            // Update your own state/map
            const newWidth = node.width() * node.scaleX();
            const newHeight = node.height() * node.scaleY();

            // reset the scale to 1
            node.scaleX(1);
            node.scaleY(1);

            //update local state
            setContent({
                ...content,
                x: node.x(),
                y: node.y(),
                width: newWidth,
                height: newHeight,
                rotation: node.rotation(),
            });

            // update the content in contentsMap
            contentsMap.set(id, {
                ...content,
                x: node.x(),
                y: node.y(),
                width: newWidth,
                height: newHeight,
                rotation: node.rotation(),
            });
        }
    }

    //render empty div if no text content
    if (!content) return null

    return (
        <>
            <Text
                ref={textRef}
                key={content.id}
                x={content.x}
                y={content.y}
                width={content.width}
                height={content.height}
                text={content.text || "Sample Text"}
                fontSize={24}
                fill="black"
                draggable
                onTransformEnd={handleTransformEnd}
            />
            <Transformer
                ref={transformerRef}
                rotateEnabled={true}
                enabledAnchors={['middle-left', 'middle-right']}
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
