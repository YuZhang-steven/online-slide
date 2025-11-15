"use client"

import { useState } from "react"
type Props = {
    pageArr?: string[]
}

export default function PageSelectionArea({ pageArr }: Props) {
    const [pageList, setPageList] = useState<string[]>(pageArr || [])


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
            >
                Add A New Page
            </div>
        </div>
    )
}
