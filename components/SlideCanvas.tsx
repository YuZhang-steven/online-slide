"use client"
import { useRef } from "react";
import { Stage } from "react-konva";

export default function SlideCanvas() {
    const stageRef = useRef(null)
    return (
        <div
            id="slide-canvas-area"
            className="flex justify-center items-center 
            w-full h-full bg-gray-100"
        >
            <div
                id="slide-canva"

                style={{
                    width: "900px",
                    height: "600px",
                    overflow: "hidden",
                    border: "1px solid #ccc",
                    backgroundColor: "#fff",
                }}
            >
                <Stage width={900} height={600} />
            </div>
        </div>

    )
}
