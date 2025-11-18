"use client"

import { useEffect, useState } from "react"
import PageCard from "./ui/PageCard"
import AddNewPageCard from "./ui/AddNewPageCard"
import { useCurrentPageStore } from "./globalState/useCurrentPageStore"
import useSwitchToANewPage from "@/lib/hooks/useSwitchToANewPage"

/**
 * Sidebar component for selecting and managing pages in a presentation.
 * 
 * Displays a vertical list of `PageCard` components and an `AddNewPageCard`.
 * Automatically switches to the first page if no current page is selected.
 *
 * @component
 * @param {string} props.presentationId - The ID of the current presentation.
 * @param {string[]} [props.pageArr] - Optional initial array of page IDs.
 * @returns {JSX.Element} The page selection sidebar.

 * @notes
 * - Uses `useEffect` to set the first page as the current page if none is selected.
 * - Maintains local `pageList` state to track available pages.
 * - Allows switching pages using the `switchToANewPage` hook.
 */

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
