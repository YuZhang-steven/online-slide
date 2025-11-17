import { useCurrentPageStore } from "@/components/globalState/useCurrentPageStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SwitchToANewPageInputType = {
    pageID: string,
    pageIndex: number,
}

//Handle jump to a new page and update the url search params
export default function useSwitchToANewPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const setCurrentPageID = useCurrentPageStore.getState().setCurrentPageID;
    const setCurrentPageIndex = useCurrentPageStore.getState().setCurrentPageIndex;

    function switchToANewPage({ pageID, pageIndex }: SwitchToANewPageInputType) {
        // Update the current page ID in the global store
        setCurrentPageID(pageID || "");
        setCurrentPageIndex(pageIndex);

        //get current search params
        const newSearchParams = new URLSearchParams(
            searchParams.toString()
        );

        // Set or update the "page" parameter
        newSearchParams.set("page", pageID || "");
        const newUrl = `${pathname}?${newSearchParams.toString()}`;
        router.push(newUrl);
    }

    return { switchToANewPage };

}
