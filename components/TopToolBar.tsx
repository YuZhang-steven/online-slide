"use client"
import TextBlockAdd from './TopBarTools/TextBlockAdd'
import ImageBlockAdd from './TopBarTools/ImageBlockAdd'
import VideoBlockAdd from './TopBarTools/VideoBlockAdd'
import { useCurrentPageStore } from './globalState/useCurrentPageStore';


export default function TopToolBar() {
    const currentPageID = useCurrentPageStore((state) => state.currentPageID);
    if (!currentPageID) {
        return null;
    }
    return (
        <div className="flex">
            <TextBlockAdd />
            <ImageBlockAdd pageID={currentPageID} />
            <VideoBlockAdd />
        </div>
    )
}
