"use client";

import { useCurrentPageStore } from "../globalState/useCurrentPageStore";
import { Card, CardFooter } from "./card"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
    pageID: string
    footer?: string | number
    presentationID: string
    pageList: string[]
    setPageList: (pages: string[]) => void
}

export default function PageCard({
    pageID, footer, presentationID, setPageList, pageList }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const setCurrentPageID = useCurrentPageStore.getState().setCurrentPageID;

    //handle click th page card and update the url search params
    function handleClick() {
        console.log('Page card clicked:', pageID);
        //get current search params
        const newSearchParams = new URLSearchParams(
            searchParams.toString()
        );
        // Update the current page ID in the global store
        setCurrentPageID(pageID || "");

        // Set or update the "page" parameter
        newSearchParams.set("page", pageID || "");
        const newUrl = `${pathname}?${newSearchParams.toString()}`;
        router.push(newUrl);
    }

    //handle delete page
    async function handleDelete(e: React.MouseEvent, id: string | undefined) {
        e.stopPropagation();
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
                body: JSON.stringify({ pageId: id }),
            });
            if (!res.ok) {
                console.error('Failed to delete page');
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
            relative
            group
            cursor-pointer 
            p-2 m-2
             bg-purple-200  hover:bg-purple-300
             transition-transform duration-200
             "
            onClick={handleClick}
        >
            <button
                className=" 
                absolute top-2 right-2 z-10 
                w-6 h-6 rounded-lg flex items-center justify-center
                bg-white text-gray-500 hover:text-gray-700
                opacity-0 group-hover:opacity-100 hover:opacity-100
                transition-opacity duration-150
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
                    <p>{footer}</p>
                </CardFooter>

            </div>

        </Card>
    )
}
