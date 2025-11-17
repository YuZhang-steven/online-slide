"use client"
import TextBlockAdd from './TopBarTools/TextBlockAdd'
import ImageBlockAdd from './TopBarTools/ImageBlockAdd'
import VideoBlockAdd from './TopBarTools/VideoBlockAdd'
import { useCurrentPageStore } from './globalState/useCurrentPageStore';
import SavePageButton from './TopBarTools/SavePageButton';

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
        <div className="flex">
            <SavePageButton
                pageID={currentPageID}
                presentationID={presentationID}
                pageIndex={currentPageIndex}
            />
            <TextBlockAdd pageID={currentPageID} />
            <ImageBlockAdd pageID={currentPageID} />
            <VideoBlockAdd pageID={currentPageID} />
        </div>
    )
}
