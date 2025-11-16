
import { Text, Transformer } from 'react-konva'
import { contentsMap } from '../globalState/contentsMap'
import { useRef, useState } from 'react';
import Konva from 'konva';
import useTransformationHandle from '@/lib/hooks/useTransformationHandle';

type Props = {
    id: string
}

export default function TextContent({ id }: Props) {
    const textRef = useRef<Konva.Text | null>(null)
    const transformerRef = useRef<Konva.Transformer | null>(null);

    //get text content from contentsMap
    const [content, setContent] = useState(contentsMap.get(id));
    //state to track if text is being typed
    const [isEditing, setIsEditing] = useState(false);

    //handle transformer(resize and rotate) when content changes
    const { handleTransformEnd } = useTransformationHandle({
        id,
        content,
        contentRef: textRef,
        transformerRef,
        localStateSetter: setContent
    })

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
