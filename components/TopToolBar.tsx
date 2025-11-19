"use client"
import TextBlockAdd from './TopBarTools/TextBlockAdd'
import ImageBlockAdd from './TopBarTools/ImageBlockAdd'
import VideoBlockAdd from './TopBarTools/VideoBlockAdd'
import { useCurrentPageStore } from './globalState/useCurrentPageStore';
import SavePageButton from './TopBarTools/SavePageButton';
import DeleteBlock from './TopBarTools/DeleteBlock';
/**
 * Top toolbar component for the presentation editor.
 * Displays Tool buttons 
 *
 * @component
 * @param {string} props.presentationID - The ID of the current presentation.
 * @returns {JSX.Element | null} The toolbar component, or null if no page is selected.
 */

type Props = {
    presentationID: string
}

export default function TopToolBar({ presentationID }: Props) {
    const currentPageID = useCurrentPageStore((state) => state.currentPageID);
    const currentPageIndex = useCurrentPageStore((state) => state.currentPageIndex);
    if (!currentPageID || currentPageIndex === null) {
        return null;
    }
    return (
        <div className="flex items-center justify-between
        h-full w-ful px-4
        bg-gray-100 
        ">
            <div
                id="constant-tools"
                className="flex gap-2 items-center"
            >
                <SavePageButton
                    pageID={currentPageID}
                    presentationID={presentationID}
                    pageIndex={currentPageIndex}
                />
                <TextBlockAdd pageID={currentPageID} />
                <ImageBlockAdd pageID={currentPageID} />
                <VideoBlockAdd pageID={currentPageID} />
            </div>
            <div
                id="flexible-space"
                className="flex gap-2 items-center"
            >
                <DeleteBlock />

            </div>

        </div>
    )
}
