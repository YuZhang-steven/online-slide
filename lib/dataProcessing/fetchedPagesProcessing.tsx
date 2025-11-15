import { Page } from "@prisma/client"

type Props = {
    fetchedPages: Page[]
}

export default function fetchedPagesProcessing({ fetchedPages }: Props) {
    const res: string[] = []

    //sort pages by order
    fetchedPages.sort((a, b) => a.order - b.order)

    //creating an array of page ids
    fetchedPages.forEach(page => {
        res.push(page.id)
    })


    return res
}
