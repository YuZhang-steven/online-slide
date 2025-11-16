"use client"
import { useEffect, useRef } from "react";
import { Layer, Stage } from "react-konva";
import RenderingTextContent from "./renderingElementsType/RenderingTextContent";
import RenderingImageContent from "./renderingElementsType/RenderingImageContent";
import RenderingVideoContent from "./renderingElementsType/RenderingVideoContent";
import Konva from "konva";
import { useCurrentPageStore } from "./globalState/useCurrentPageStore";

export default function SlideCanvas() {
    const layerRef = useRef(null)
    const stageRef = useRef(null)
    const currentPageID = useCurrentPageStore((state) => state.currentPageID);

    useEffect(() => {
        console.log("Current Page ID changed to: ", currentPageID);

    }, [currentPageID])
    useEffect(() => {
        const anim = new Konva.Animation(() => { }, layerRef.current)
        anim.start()

        return () => {
            anim.stop()
        }
    }, [layerRef.current])


    return (
        <div
            id="slide-canvas-area"
            className="flex justify-center items-center 
            w-full h-full"
        >
            <div
                id="slide-canva"
                style={{
                    width: "1024px",
                    height: "798px",
                    overflow: "hidden",
                    border: "1px solid #ccc",
                    backgroundColor: "#fff",
                }}
            >
                <Stage width={1024} height={798} ref={stageRef}>
                    <Layer ref={layerRef}>

                        <RenderingTextContent />
                        <RenderingImageContent />
                        <RenderingVideoContent />

                    </Layer>

                </Stage>
            </div>
        </div>

    )
}
