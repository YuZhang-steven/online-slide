import { useRef } from "react";
import { Transformer } from "react-konva";
import Konva from "konva";

export default function ContentTransformer() {

    const transformerRef = useRef<Konva.Transformer | null>(null);


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
