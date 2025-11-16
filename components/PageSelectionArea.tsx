"use client"

import addNewPages from "@/app/action/addNewPages"
import { useState } from "react"
import PageCard from "./ui/PageCard"
import AddNewPageCard from "./ui/AddNewPageCard"

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
    function handlePageLinkClick(pageId: string) {

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
                    <PageCard
                        key={pageId}
                        pageId={pageId}
                        footer={index + 1}
                    />
                ))
            }
            <AddNewPageCard
                presentationId={presentationId}
                pageList={pageList}
                setPageList={setPageList}

            />
        </div>
    )
}
