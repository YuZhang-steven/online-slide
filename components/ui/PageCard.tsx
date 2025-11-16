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
    return (
        <Card
            className="cursor-pointer 
            p-2 m-2
             bg-purple-200  hover:bg-purple-300
             transition-transform duration-200
             flex flex-col items-center
             "
            onClick={handleClick}
        >
            <div
                className="h-20 w-50 bg-muted"
            />
            <CardFooter>
                <p>{footer}</p>
            </CardFooter>
        </Card>
    )
}
