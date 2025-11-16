"use client"
import TextBlockAdd from './TopBarTools/TextBlockAdd'
import ImageBlockAdd from './TopBarTools/ImageBlockAdd'
import VideoBlockAdd from './TopBarTools/VideoBlockAdd'


export default function TopToolBar() {
    return (
        <div className="flex">
            <TextBlockAdd />
            <ImageBlockAdd />
            <VideoBlockAdd />
        </div>
    )
}
