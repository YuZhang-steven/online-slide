import { Image } from "lucide-react";
import ToolButton from "../ui/ToolButton";

export default function ImageBlockAdd() {

    function handleClick() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            const reader = new window.FileReader();
            reader.onload = () => {
                const img = new window.Image();

                console.log("Add Image Block", reader.result);
                // Implementation for adding an image block goes here
            };
            reader.readAsDataURL(file);
        };
        input.click();
    }

    return (
        <ToolButton
            onClick={handleClick}
        >
            <Image
                className="text-black"
                size={30}
            />
        </ToolButton>
    )
}
