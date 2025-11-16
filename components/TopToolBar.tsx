"use client"
import { Clapperboard, Image, TextCursorInputIcon } from 'lucide-react'
import ToolButton from './ui/ToolButton'
import TextBlockAdd from './TopBarTools/TextBlockAdd'


export default function TopToolBar() {
    return (
        <div className="flex">
            <TextBlockAdd />
            <ToolButton>
                <Clapperboard
                    className="text-black"
                    size={30}
                />
            </ToolButton>
            <ToolButton>
                <Image
                    className="text-black"
                    size={30}
                />
            </ToolButton>
        </div>
    )
}
