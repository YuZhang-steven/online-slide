import { Save } from "lucide-react";
import ToolButton from "../ui/ToolButton";
import { getDeletedContentsIDArray } from "../globalState/deletedContentSet";
import { UpdatePageInput } from "@/lib/zod/schemas";
import { packageContentArray } from "../globalState/contentsMap";

type Props = {
    pageID: string
    presentationID: string
    pageIndex: number
}
export default function SavePageButton({ pageID, presentationID, pageIndex }: Props) {

    async function handleClick() {
        const deletedContentIDs = getDeletedContentsIDArray();
        console.log("Save Page Clicked")
        const updateData: UpdatePageInput = {
            order: pageIndex,
            contents: packageContentArray(),
            deletedContentIds: deletedContentIDs.length > 0 ? deletedContentIDs : undefined,
        }
        try {
            const res = await fetch(`/api/presentations/${presentationID}/pages?pageID=${pageID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
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
