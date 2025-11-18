
import { ContentLocal, contentsMap } from "@/components/globalState/contentsMap";
import Konva from "konva";
import { useEffect } from "react";
/**
 * Custom hook to handle transformations (resize, rotate) and dragging
 * for a Konva node representing content on the canvas.
 *
 * Updates both the local React state and the global `contentsMap`.

 * @param {string} props.id - The unique ID of the content
 * @param {ContentLocal | undefined} props.content - The content object from contentsMap
 * @param {React.RefObject<Konva.Node | null>} props.contentRef - Ref to the Konva node (Text/Image/Video)
 * @param {React.RefObject<Konva.Transformer | null>} props.transformerRef - Ref to the Konva Transformer
 * @param {React.Dispatch<React.SetStateAction<ContentLocal | undefined>>} props.localStateSetter - Local state setter for the content
 * @param {HTMLImageElement | HTMLVideoElement | string | null} [props.loadTag] - Optional image/video tag used to trigger the transformer update
 *
 * @returns {Object} - Handlers for Konva events
 * @returns {function} return.handleTransformEnd - Call when a transform ends to update state
 * @returns {function} return.handleDragEnd - Call when a drag ends to update state
 */

type Prop = {
    id: string,
    content: ContentLocal | undefined,
    contentRef: React.RefObject<Konva.Node | null>,
    transformerRef: React.RefObject<Konva.Transformer | null>,
    localStateSetter: React.Dispatch<React.SetStateAction<ContentLocal | undefined>>,
    loadTag?: HTMLImageElement | string | HTMLVideoElement | null
}

export default function useTransformationHandle(
    { id, content, transformerRef,
        contentRef, localStateSetter,
        loadTag = "tag"
    }: Prop
) {
    //handle transformer(resize and rotate) when content changes
    useEffect(() => {
        if (loadTag && transformerRef.current && contentRef.current) {
            transformerRef.current.nodes([contentRef.current]);
            transformerRef.current.getLayer()?.batchDraw();
        }
    }, [id, content, transformerRef, contentRef, loadTag])

    // update the contentsMap when transform ends
    function handleTransformEnd() {

        const node = contentRef.current;

        if (node && content) {
            // Update your own state/map
            const newWidth = node.width() * node.scaleX();
            const newHeight = node.height() * node.scaleY();

            // reset the scale to 1
            node.scaleX(1);
            node.scaleY(1);

            //update local state
            localStateSetter({
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
    function handleDragEnd() {
        const node = contentRef.current;

        if (node && content) {
            //update local state
            localStateSetter({
                ...content,
                x: node.x(),
                y: node.y(),
            });

            // update the content in contentsMap
            contentsMap.set(id, {
                ...content,
                x: node.x(),
                y: node.y(),
            });
        }
    }
    return { handleTransformEnd, handleDragEnd };


}
