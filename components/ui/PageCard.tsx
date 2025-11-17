"use client";

import { useCurrentPageStore } from "../globalState/useCurrentPageStore";
import { Card, CardFooter } from "./card"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
    pageId?: string
    footer?: string | number
}

export default function PageCard({
    pageId, footer, }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const setCurrentPageID = useCurrentPageStore.getState().setCurrentPageID;
    function handleClick() {
        console.log('Page card clicked:', pageId);
        //get current search params
        const newSearchParams = new URLSearchParams(
            searchParams.toString()
        );
        // Update the current page ID in the global store
        setCurrentPageID(pageId || "");

        // Set or update the "page" parameter
        newSearchParams.set("page", pageId || "");
        const newUrl = `${pathname}?${newSearchParams.toString()}`;
        router.push(newUrl);
    }
    function handleDelete(e: React.MouseEvent) {
        e.stopPropagation();
        // Implement delete functionality here
        console.log('Delete button clicked for page:', pageId);
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
                onClick={handleDelete}
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
