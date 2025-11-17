
import { ContentLocal, contentsMap } from "@/components/globalState/contentsMap";
import Konva from "konva";
import { useEffect } from "react";

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
    function handleTransformEnd(e: Konva.KonvaEventObject<Event>) {

        const node = contentRef.current;

        if (node && content) {
            // Update your own state/map
            const newWidth = node.width() * node.scaleX();
            const newHeight = node.height() * node.scaleY();

            // reset the scale to 1
            node.scaleX(1);
            node.scaleY(1);

            console.log("transform location"
                , {
                    x: node.x(),
                    y: node.y(),
                    width: newWidth,
                    height: newHeight,
                    rotation: node.rotation(),
                }
            );


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
    return { handleTransformEnd };


}
