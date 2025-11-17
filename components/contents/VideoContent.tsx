import { useEffect, useRef, useState } from "react";
import { contentsMap } from "../globalState/contentsMap"
import { Image, Transformer } from "react-konva";
import Konva from "konva";
import useTransformationHandle from "@/lib/hooks/useTransformationHandle";

type Props = {
    id: string
}


export default function VideoContent({ id }: Props) {
    const videoRef = useRef<Konva.Image | null>(null)
    const transformerRef = useRef<Konva.Transformer | null>(null);

    //get video content from contentsMap
    const [content, setContent] = useState(contentsMap.get(id));
    const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(
        content?.video || null
    );

    //initialize video
    useEffect(() => {
        if (content && content.url) {
            const video = document.createElement('video');
            video.src = content.url;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.autoplay = true;

            video.onloadedmetadata = () => {
                setVideoElement(video);
                content.video = video;
                contentsMap.set(id, content);

            }
            video.load()
        }
    }, [content, id]);




    //handle transformer(resize and rotate) when content changes
    const { handleTransformEnd } = useTransformationHandle({
        id,
        content,
        contentRef: videoRef,
        transformerRef,
        localStateSetter: setContent,
        loadTag: videoElement
    })

    // if no video content, render empty div
    if (!content || !videoElement) return null

    return (
        <>
            <Image
                ref={videoRef}
                key={content.id}
                x={content.x}
                y={content.y}
                width={content.width}
                height={content.height}
                image={videoElement}
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
