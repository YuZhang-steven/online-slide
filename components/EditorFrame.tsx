"use client"
import { Page } from "@prisma/client";
import PageSelectionArea from "./PageSelectionArea";
import fetchedPagesProcessing from "@/lib/dataProcessing/fetchedPagesProcessing";
import TopToolBar from "./TopToolBar";
type Props = {
    children?: React.ReactNode
    id: string
    fetchedPages: Page[]
}


export default function EditorFrame(
    { children, id, fetchedPages }: Props
) {

    const pageArr = fetchedPagesProcessing({ fetchedPages });

    return (
        <div
            id="editor-frame"
            className="fixed h-full w-full bg-amber-300
            flex
            "
        >
            <div
                id="editor-sidebar"
                className="h-full w-64 bg-emerald-500"
            >
                <PageSelectionArea
                    presentationId={id}
                    pageArr={pageArr}
                />
            </div>
            <div
                id="editor-content-area"
                className="flex-1 grid grid-rows-[auto_1fr] "
            >
                <div
                    id="editor-toolbar-top"
                    className="h-20 w-full bg-blue-500"
                >
                    <TopToolBar />
                </div>
                <div
                    className=" bg-red-500 border-4 border-black overflow-auto"
                >{children}</div>

            </div>

        </div>
    )
}
