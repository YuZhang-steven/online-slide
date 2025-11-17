import { Save } from "lucide-react";
import ToolButton from "../ui/ToolButton";

type Props = {
    pageID: string
}
export default function SavePageButton({ pageID }: Props) {
    function handleClick() {
        console.log("Save Page Clicked")
        // Implement save functionality here
    }
    return (
        <ToolButton
            onClick={handleClick}
        >
            <Save
                className="text-black"
                size={30}
            />
        </ToolButton>
    )
}
