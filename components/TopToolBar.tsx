"use client"
import { Clapperboard, Image, TextCursorInputIcon } from 'lucide-react'
import ToolButton from './ui/ToolButton'


export default function TopToolBar() {
    return (
        <div className="flex">
            <ToolButton>
                <TextCursorInputIcon
                    className="text-black"
                    size={30}
                />
            </ToolButton>
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
