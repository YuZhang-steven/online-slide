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
            className="fixed h-full w-full
            flex
            "
        >
            <div
                id="editor-sidebar"
                className="h-full w-64 bg-gray-100
               border-r-2 border-gray-400/50 "
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
                    className="h-20 w-full border-b-3 border-gray-400/50  "
                >
                    <TopToolBar presentationID={id} />
                </div>
                <div
                    className=" bg-gray-300  overflow-auto flex-1 flex"
                >{children}</div>

            </div>

        </div>
    )
}
