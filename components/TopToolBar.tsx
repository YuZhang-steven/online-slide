"use client"
import { Clapperboard, Image, TextCursorInputIcon } from 'lucide-react'
import ToolButton from './ui/ToolButton'
import TextBlockAdd from './TopBarTools/TextBlockAdd'
import ImageBlockAdd from './TopBarTools/ImageBlockAdd'


export default function TopToolBar() {
    return (
        <div className="flex">
            <TextBlockAdd />
            <ImageBlockAdd />
            <ToolButton>
                <Clapperboard
                    className="text-black"
                    size={30}
                />
            </ToolButton>

        </div>
    )
}
