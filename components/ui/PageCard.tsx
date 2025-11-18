"use client";
import useSwitchToANewPage from "@/lib/hooks/useSwitchToANewPage";
import { Card, CardFooter } from "./card"

type Props = {
    pageID: string
    index: number
    presentationID: string
    pageList: string[]
    setPageList: (pages: string[]) => void
}

/**
 * Represents a single page card in a presentation.
 *
 * Displays the page thumbnail and index, and allows switching to the page
 * or deleting it from the presentation.
 *
 * @param {string} props.pageID - The unique ID of the page
 * @param {number} props.index - The index of the page in the presentation
 * @param {string} props.presentationID - The ID of the presentation
 * @param {string[]} props.pageList - Array of all page IDs in the presentation
 * @param {(pages: string[]) => void} props.setPageList - Function to update the page list state
 */

export default function PageCard({
    pageID, index, presentationID, setPageList, pageList }: Props) {

    const { switchToANewPage } = useSwitchToANewPage();

    //handle click th page card and update the url search params
    function handleClick() {
        switchToANewPage({ pageID: pageID, pageIndex: index });

    }
    //handle delete page
    async function handleDelete(e: React.MouseEvent, id: string | undefined) {
        e.preventDefault();
        e.stopPropagation()
        if (pageList.length <= 1) {
            alert("Cannot delete the last page of the presentation.");
            return;
        }

        if (!id) {
            console.error('No page ID provided for deletion.');
            return;
        }
        try {
            const res = await fetch(`/api/presentations/${presentationID}/pages`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pageID: id }),
            });
            if (!res.ok) {
                console.error('Failed to delete page', await res.text());
                return;
            }
            setPageList(pageList.filter((page) => page !== id));

        } catch (error) {
            console.error('Error deleting page:', error);
        }
    }

    return (
        <Card
            className="
            relative group
            cursor-pointer 
            p-2 m-2
            bg-gray-200 text-gray-700  
            shadow-lg hover:bg-sky-200 
            transition-color duration-200
             "
            onClick={handleClick}
        >
            <button
                className=" 
                absolute top-2 right-2 z-10 
                w-6 h-6 rounded-lg flex items-center justify-center
                bg-gray-100 hover:bg-gray-200 text-gray-300 hover:text-gray-600
                opacity-0 group-hover:opacity-100 hover:opacity-100
                transition-color duration-150
                cursor-pointer 
                "
                onClick={(e) => handleDelete(e, pageID)}
            >
                X
            </button>
            <div
                className="flex flex-col items-center"
            >
                <div
                    className="h-20 w-50 bg-muted"
                />
                <CardFooter>
                    <p>{index}</p>
                </CardFooter>

            </div>

        </Card>
    )
}
