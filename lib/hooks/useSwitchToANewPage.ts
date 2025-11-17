import { useCurrentPageStore } from "@/components/globalState/useCurrentPageStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


//Handle jump to a new page and update the url search params
export default function useSwitchToANewPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const setCurrentPageID = useCurrentPageStore.getState().setCurrentPageID;

    function switchToANewPage(pageID: string) {
        // Update the current page ID in the global store
        setCurrentPageID(pageID || "");
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
