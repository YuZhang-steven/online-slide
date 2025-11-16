
import ToolButton from '../ui/ToolButton'
import { TextCursorInputIcon } from 'lucide-react'

export default function TextBlockAdd() {
    function handleClick() {
        console.log("Add Text Block")
    }

    return (
        <ToolButton
            onClick={handleClick}
        >
            <TextCursorInputIcon
                className="text-black"
                size={30}

            />
        </ToolButton>
    )
}
