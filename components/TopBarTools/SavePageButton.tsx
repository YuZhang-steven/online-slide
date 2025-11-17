import { Save } from "lucide-react";
import ToolButton from "../ui/ToolButton";
import { getDeletedContentsIDArray } from "../globalState/deletedContentSet";

type Props = {
    pageID: string
    presentationID: string
}
export default function SavePageButton({ pageID, presentationID }: Props) {

    async function handleClick() {
        const deletedContentIDs = getDeletedContentsIDArray();
        console.log("Save Page Clicked")
        try {
            const res = await fetch(`/api/presentations/${presentationID}/pages?pageID=${pageID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pageID }),
            });
            if (!res.ok) {
                console.error('Failed to save page', await res.text());
                return;
            }

        } catch (error) {
            console.error('Error saving page:', error);
        }
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
