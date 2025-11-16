"use client"
import { Content, ContentType } from '@prisma/client'
import ToolButton from '../ui/ToolButton'
import { TextCursorInputIcon } from 'lucide-react'
import { contentsMap } from '../globalState/contentsMap'
import { useCurrentPageContents } from '../globalState/useCurrentPageContents'

export default function TextBlockAdd() {

    const setTextContents = useCurrentPageContents.getState().setTextContents

    function handleClick() {
        console.log("Add Text Block")
        const randomID = "New_Text_" + crypto.randomUUID()
        const newTextContent: Content = {
            id: randomID,
            type: ContentType.TEXT,
            pageId: "0",
            x: 0,
            y: 0,
            width: 200,
            height: 50,
            text: "New Text",
            url: null
        }
        // Add the new text content to the contentsMap
        contentsMap.set(randomID, newTextContent)
        // Update the current page contents state
        const currentContents = useCurrentPageContents.getState().textContents
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
