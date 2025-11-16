"use client"
import { useRef } from "react";
import { Layer, Stage, Text } from "react-konva";

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
                        <Text
                            x={90}
                            y={50}
                            text="This is a sample slide canvas!"
                            fontSize={24}
                            fill="black"
                            draggable
                        />

                    </Layer>

                </Stage>
            </div>
        </div>

    )
}
