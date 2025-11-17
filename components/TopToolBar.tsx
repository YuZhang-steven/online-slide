"use client"
import TextBlockAdd from './TopBarTools/TextBlockAdd'
import ImageBlockAdd from './TopBarTools/ImageBlockAdd'
import VideoBlockAdd from './TopBarTools/VideoBlockAdd'
import { useCurrentPageStore } from './globalState/useCurrentPageStore';
import SavePageButton from './TopBarTools/SavePageButton';


export default function TopToolBar() {
    const currentPageID = useCurrentPageStore((state) => state.currentPageID);
    if (!currentPageID) {
        return null;
    }
    return (
        <div className="flex">
            <SavePageButton pageID={currentPageID} />
            <TextBlockAdd pageID={currentPageID} />
            <ImageBlockAdd pageID={currentPageID} />
            <VideoBlockAdd pageID={currentPageID} />
        </div>
    )
}
