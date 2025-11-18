"use client"
import { Page } from "@prisma/client";
import PageSelectionArea from "./PageSelectionArea";
import fetchedPagesProcessing from "@/lib/dataProcessing/fetchedPagesProcessing";
import TopToolBar from "./TopToolBar";

/**
 * Main editor layout component for a presentation.
 *
 * Combines the sidebar (`PageSelectionArea`), top toolbar (`TopToolBar`),
 * and the main content area for editing slides. Handles layout and structure,
 * while the children prop contains the slide canvas or other dynamic content.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Dynamic content of the editor (e.g., slide canvas).
 * @param {string} props.id - The ID of the current presentation.
 * @param {Page[]} props.fetchedPages - Array of pages fetched for the presentation.
 * @returns {JSX.Element} The full editor frame layout.
 * @notes
 * - Processes the fetched pages using `fetchedPagesProcessing`.
 * - Renders the sidebar with all pages and the option to add new pages.
 * - Top toolbar allows adding content blocks and saving pages.
 * - Children are rendered in the main editor content area.
 */
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
