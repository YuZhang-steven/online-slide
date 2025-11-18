import { pageMap } from "@/components/globalState/pageMap"
import { Page } from "@prisma/client"

type Props = {
    fetchedPages: Page[]
}

/**
 * Processes an array of fetched pages by:
 * 1. Sorting them according to their `order` property.
 * 2. Creating an array of page IDs in the sorted order.
 * 3. Updating the global `pageMap` with an empty Set for each page ID.
 *
 * @param {Props} props - Object containing `fetchedPages`
 * @returns {string[]} An array of page IDs sorted by their order
 */

export default function fetchedPagesProcessing({ fetchedPages }: Props) {
    const res: string[] = []

    //sort pages by order
    fetchedPages.sort((a, b) => a.order - b.order)

    //creating an array of page ids
    fetchedPages.forEach(page => {
        res.push(page.id)
        //update the pageMap
        pageMap.set(page.id, new Set<string>())
    })


    return res
}
