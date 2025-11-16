"use client"

import { useEffect, useState } from "react"
import PageCard from "./ui/PageCard"
import AddNewPageCard from "./ui/AddNewPageCard"
import { useCurrentPageStore } from "./globalState/useCurrentPageStore"

type Props = {
    presentationId: string
    pageArr?: string[]
}

export default function PageSelectionArea({ pageArr, presentationId }: Props) {
    const currentPageID = useCurrentPageStore((state) => state.currentPageID);
    const setCurrentPageID = useCurrentPageStore((state) => state.setCurrentPageID);
    const [pageList, setPageList] = useState<string[]>(pageArr || [])
    useEffect(() => {
        if (pageList.length > 0 && !currentPageID) {
            setCurrentPageID(pageList[0])
        }
    }, [currentPageID, pageList])

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
