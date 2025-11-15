"use client"

import addNewPages from "@/app/action/addNewPages"
import { useState } from "react"

type Props = {
    presentationId: string
    pageArr?: string[]
}

export default function PageSelectionArea({ pageArr, presentationId }: Props) {
    const [pageList, setPageList] = useState<string[]>(pageArr || [])

    async function handleAddNewPage() {
        const res = await addNewPages({ presentationId })
        if (res.status !== '201') {
            console.error('Failed to add new page')
            return
        }
        console.log('New page added:', res.data);
        const newPageId = (pageList.length + 1).toString()
        setPageList([...pageList, newPageId])

    }
    return (
        <div
            id="page-selection-area"
            className="h-full w-full bg-purple-400 
            flex flex-col items-center overflow-auto
            "
        >
            {
                pageList.map((pageId, index) => (
                    <div
                        key={index}
                        className="p-4 m-2 bg-purple-200 rounded
                        hover:bg-purple-300
                        cursor-pointer
                        "
                    >
                        Page {pageId}
                    </div>
                ))
            }
            <div
                key={"add new page"}
                className="p-4 m-2 bg-purple-200 rounded
                        hover:bg-purple-300
                        cursor-pointer
                        "
                onClick={handleAddNewPage}
            >
                Add A New Page
            </div>
        </div>
    )
}
