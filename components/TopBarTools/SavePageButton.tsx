"use client";
import { Save } from "lucide-react";
import ToolButton from "../ui/ToolButton";
import { getDeletedContentsIDArray, getDeletedContentsUrlArray } from "../globalState/deletedContentSet";
import { UpdatePageInput } from "@/lib/zod/schemas";
import { packageContentArray } from "../globalState/contentsMap";
/**
 * Button component to save the current page.
 * Sends the current page content, including any deleted content IDs, 
 * to the server to update the page data.
 *
 * @param {string} props.pageID - ID of the page being saved
 * @param {string} props.presentationID - ID of the parent presentation
 * @param {number} props.pageIndex - The order/index of the page
 * @returns {JSX.Element} A button that triggers page save when clicked
 */

type Props = {
    pageID: string
    presentationID: string
    pageIndex: number
}
export default function SavePageButton({ pageID, presentationID, pageIndex }: Props) {
    /**
     * Handles the click event on the save button.
     * Prepares the data to be updated, including new contents and deleted content IDs,
     * sends a PUT request to update the page on the server, and reloads the window on success.
     */
    async function handleClick() {
        const deletedContentIDs = getDeletedContentsIDArray();
        const deleteURLs = getDeletedContentsUrlArray();

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
            const resR2 = await fetch(`/api/upload`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ urls: deleteURLs }),
            })

            window.location.reload();

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
