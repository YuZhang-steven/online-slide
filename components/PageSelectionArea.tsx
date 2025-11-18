"use client"

import { useEffect, useState } from "react"
import PageCard from "./ui/PageCard"
import AddNewPageCard from "./ui/AddNewPageCard"
import { useCurrentPageStore } from "./globalState/useCurrentPageStore"
import useSwitchToANewPage from "@/lib/hooks/useSwitchToANewPage"

type Props = {
    presentationId: string
    pageArr?: string[]
}

export default function PageSelectionArea({ pageArr, presentationId }: Props) {
    const currentPageID = useCurrentPageStore((state) => state.currentPageID);
    const [pageList, setPageList] = useState<string[]>(pageArr || [])
    const { switchToANewPage } = useSwitchToANewPage()

    useEffect(() => {
        //set to the first page by default
        if (pageList.length > 0 && !currentPageID) {
            switchToANewPage({ pageID: pageList[0], pageIndex: 1 });
        }
    }, [currentPageID, pageList])

    return (
        <div
            id="page-selection-area"
            className="h-full w-full  
            flex flex-col items-center overflow-auto
            "
        >
            {
                pageList.map((pageId, index) => (
                    <PageCard
                        key={pageId}
                        pageID={pageId}
                        index={index + 1}
                        presentationID={presentationId}
                        setPageList={setPageList}
                        pageList={pageList}
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
