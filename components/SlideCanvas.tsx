"use client"
import { useEffect, useRef } from "react";
import { Layer, Stage } from "react-konva";
import { Layer as KonvaLayer } from "konva/lib/Layer";
import RenderingTextContent from "./renderingElementsType/RenderingTextContent";
import RenderingImageContent from "./renderingElementsType/RenderingImageContent";
import RenderingVideoContent from "./renderingElementsType/RenderingVideoContent";
import Konva from "konva";
import { useCurrentPageStore } from "./globalState/useCurrentPageStore";
import { useCurrentPageContentStore } from "./globalState/useCurrentPageContentStore";
import fetchAllContentsAndProcessing from "@/lib/dataProcessing/fetchAllContentsAndProcessing";

/**
 * SlideCanvas component for the presentation editor.
 * 
 * Renders the main canvas for a single presentation page using Konva.
 * Handles fetching and managing the current page's text, image, and video content,
 * and updates the content stores. Also manages the Konva animation loop for rendering
 * video frames.
 *
 * @component
 * @param {string} props.presentationID - The ID of the current presentation.
 * @returns {JSX.Element | null} The slide canvas component, or null if no page is selected.
 * @notes
 * - Uses `useEffect` to fetch page contents whenever `currentPageID` changes.
 * - Resets content stores on unmount or page change.
 * - Sets up a Konva.Animation loop for redrawing the layer continuously (for videos).
 */

type SlideCanvasProps = {
    presentationID: string;
}

export default function SlideCanvas({ presentationID }: SlideCanvasProps) {
    const layerRef = useRef<KonvaLayer>(null)
    const stageRef = useRef(null)
    const currentPageID = useCurrentPageStore((state) => state.currentPageID);

    const setTextContents = useCurrentPageContentStore.getState().setTextContents;
    const setImageContents = useCurrentPageContentStore.getState().setImageContents;
    const setVideoContents = useCurrentPageContentStore.getState().setVideoContents;

    //fetch all contents if currentPageID changes
    useEffect(() => {
        if (!currentPageID) return;
        //reset all contents current list
        async function fetchContents() {
            if (!currentPageID) return;
            const res = await fetchAllContentsAndProcessing({ pageID: currentPageID, presentationID });
            //after fetching, update the current page content store
            if (res) {
                setTextContents(res.textIDs);
                setImageContents(res.imageIDs);
                setVideoContents(res.videoIDs);
            }

        }
        fetchContents();

        return () => {
            //cleanup contents lists
            setTextContents([]);
            setImageContents([]);
            setVideoContents([]);
        }
    }, [currentPageID]);


    useEffect(() => {
        if (!layerRef.current) return;
        const layer = layerRef.current;
        const anim = new Konva.Animation(() => {
            layer.batchDraw(); // redraw video frames
        }, layer);
        anim.start()
        return () => {
            anim.stop()
        }
    }, [])


    if (!currentPageID) {
        return null;
    }


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
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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
