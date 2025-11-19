import { useEffect, useRef, useState } from "react";
import { contentsMap } from "../globalState/contentsMap"
import { Image, Transformer } from "react-konva";
import Konva from "konva";
import useTransformationSave from "@/lib/hooks/useTransformationSave";
import { useCurrentSelectedItem } from "../globalState/useCurrentSelectedItem";

/**
 * Renders a video content block on the slide canvas with support for drag, resize, rotation, and live playback.
 * Uses `Konva.Image` and `Konva.Transformer` to render a video element on the canvas.
 *
 * @component
 * @param {Object} props
 * @param {string} props.id - The unique ID of the video content to render.
 * @returns {JSX.Element | null} A draggable, transformable, and playable video block, or `null` if the content is not available.
 *
 * @behavior
 * - Loads the video from `contentsMap` or initializes it from a URL if missing.
 * - Plays video muted and in a loop using an HTML `<video>` element.
 * - Uses `Konva.Animation` to continuously redraw the layer for smooth video playback.
 * - Supports dragging and transforming with a `Transformer`.
 * - Ensures minimum width and height of 20px when resizing.
 * - Updates local state and `contentsMap` when the video is transformed or dragged.
 * - Automatically resumes video playback after drag or transform actions.
 *
 * @example
 * <VideoContent id="video_123" />
 */

type Props = {
    id: string
}

export default function VideoContent({ id }: Props) {
    const videoRef = useRef<Konva.Image | null>(null);

    //handle Click Selection
    const setGlobalSelectedItem = useCurrentSelectedItem.getState().setCurrentSelectedItem;
    function handleClick() {
        setGlobalSelectedItem({ id, ref: videoRef });
    }

    const [content, setContent] = useState(contentsMap.get(id));
    const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(content?.video || null);

    //handle transformer(resize and rotate) when content changes
    const { handleTransformEnd, handleDragEnd } = useTransformationSave({
        id,
        content,
        contentRef: videoRef,
        localStateSetter: setContent,
    })

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
                rotation={content.rotation}
                image={videoElement}
                draggable
                cache={false}
                perfectDrawEnabled={false}
                onClick={handleClick}
                onDragEnd={resumeVideo}
                onTransformEnd={() => {
                    resumeVideo();
                    handleTransformEnd();
                }}
            />
        </>
    );
}