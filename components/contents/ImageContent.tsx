import { Image, Transformer } from "react-konva";
import { contentsMap } from "../globalState/contentsMap";
import { useRef, useState } from "react";
import Konva from "konva";
import useTransformationHandle from "@/lib/hooks/useTransformationHandle";
import useImage from "use-image";

/**
 * Renders an image content block on the slide canvas with support for drag, resize, and rotation.
 * Uses `Konva.Image` and `Konva.Transformer` for interactive editing.
 *
 * @component
 * @param {string} props.id - The unique ID of the image content to render.
 * @returns {JSX.Element | null} A draggable and transformable image block, or `null` if the content or image is not loaded.
 *
 * @behavior
 * - Loads the image using the URL from `contentsMap`.
 * - Applies a `Transformer` to allow resizing and rotation.
 * - Limits the minimum width and height of the image to 20px.
 * - Updates the local state and global store when the image is dragged or transformed.
 *
 * @example
 * <ImageContent id="image_123" />
 */

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
