import { useEffect, useRef } from "react";
import { Transformer } from "react-konva";
import Konva from "konva";
import { useCurrentSelectedItem } from "../globalState/useCurrentSelectedItem";

export default function ContentTransformer() {
    const currentSeletRef = useCurrentSelectedItem((state) => state.currentSelectedItemRef);
    const transformerRef = useRef<Konva.Transformer | null>(null);

    // Attach transformer to the currently selected item
    useEffect(() => {
        if (currentSeletRef?.current && transformerRef.current) {
            transformerRef.current.nodes([currentSeletRef.current]);
            transformerRef.current.getLayer()?.batchDraw();
        } else if (transformerRef.current) {
            transformerRef.current.nodes([]);
            transformerRef.current.getLayer()?.batchDraw();
        }
    }, [currentSeletRef])



    return (
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
    )
}
