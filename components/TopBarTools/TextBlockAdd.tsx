"use client"
import { ContentType } from '@prisma/client'
import ToolButton from '../ui/ToolButton'
import { TextCursorInputIcon } from 'lucide-react'
import { ContentLocal, contentsMap } from '../globalState/contentsMap'
import { useCurrentPageContentStore } from '../globalState/useCurrentPageContentStore'

/**
 * Button component to add a new text block to the current page.
 * Creates a new text content item, adds it to the global `contentsMap`,
 * and updates the current page's text content state to render it on the canvas.
 *
 * @param {Props} props - Component props
 * @param {string} props.pageID - ID of the current page where the text block will be added
 * @returns {JSX.Element} A button that adds a new text block when clicked
 */

type Props = {
    pageID: string
}

export default function TextBlockAdd({ pageID }: Props) {

    const setTextContents = useCurrentPageContentStore.getState().setTextContents

    /**
       * Handles the click event on the button.
       * Generates a new text content object, stores it in the global map,
       * and updates the current page content state so it appears on the canvas.
       */
    function handleClick() {
        console.log("Add Text Block")
        const randomID = "New_Text_" + crypto.randomUUID()
        const newTextContent: ContentLocal = {
            id: randomID,
            type: ContentType.TEXT,
            pageId: pageID,
            x: 200,
            y: 200,
            width: 200,
            height: 50,
            rotation: 0,
            text: "New Text",
            url: null,
            fileName: null,
        }
        // Add the new text content to the contentsMap
        contentsMap.set(randomID, newTextContent)
        // Update the current page contents state
        const currentContents = useCurrentPageContentStore.getState().textContents
        setTextContents([...currentContents, randomID])
    }

    return (
        <ToolButton
            onClick={handleClick}
        >
            <TextCursorInputIcon
                className="text-black"
                size={30}

            />
        </ToolButton>
    )
}
