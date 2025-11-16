"use client"
import { useRef } from "react";
import { Layer, Stage } from "react-konva";
import RenderingTextContent from "./RenderingElements/RenderingTextContent";
import RenderingImageContent from "./RenderingElements/RenderingImageContent";

export default function SlideCanvas() {
    const stageRef = useRef(null)
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
                <Stage width={1024} height={798}>
                    <Layer>

                        <RenderingTextContent />
                        <RenderingImageContent />

                    </Layer>

                </Stage>
            </div>
        </div>

    )
}
