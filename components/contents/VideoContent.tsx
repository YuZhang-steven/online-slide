import { useEffect, useRef, useState } from "react";
import { contentsMap } from "../globalState/contentsMap"
import { Image, Transformer } from "react-konva";
import Konva from "konva";
import useTransformationHandle from "@/lib/hooks/useTransformationHandle";

type Props = {
    id: string
}


export default function VideoContent({ id }: Props) {
    const videoRef = useRef<Konva.Image | null>(null);
    const transformerRef = useRef<Konva.Transformer | null>(null);

    const [content, setContent] = useState(contentsMap.get(id));
    const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(content?.video || null);

    // initialize video
    useEffect(() => {
        if (!content?.video && content?.url) {
            const video = document.createElement('video');
            video.src = content.url;
            video.crossOrigin = "anonymous";
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.autoplay = true;

            video.onloadedmetadata = () => {
                setVideoElement(video);
                content.video = video;
                contentsMap.set(id, content);
                video.play().catch(() => { });
            };

            video.load();
        }
    }, [content, id]);

    // force layer redraw for video playback
    useEffect(() => {
        if (!videoElement) return;
        const layer = videoRef.current?.getLayer();
        if (!layer) return;

        const anim = new Konva.Animation(() => {
            layer.batchDraw();
        }, layer);
        anim.start();

        return () => {
            anim.stop();
        };
    }, [videoElement]);

    // handle transformer / resize
    const { handleTransformEnd, handleDragEnd } = useTransformationHandle({
        id,
        content,
        contentRef: videoRef,
        transformerRef,
        localStateSetter: setContent,
        loadTag: videoElement
    });

    if (!content || !videoElement) return null;

    const resumeVideo = () => {
        handleDragEnd();
        videoElement.play().catch(() => { });
        videoRef.current?.getLayer()?.batchDraw();
    };

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
                cache={false}
                perfectDrawEnabled={false}
                onDragEnd={resumeVideo}
                onTransformEnd={() => {
                    resumeVideo();
                    handleTransformEnd();
                }}
            />
            <Transformer
                ref={transformerRef}
                rotateEnabled
                enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
                boundBoxFunc={(oldBox, newBox) => (newBox.width < 20 || newBox.height < 20 ? oldBox : newBox)}
            />
        </>
    );
}