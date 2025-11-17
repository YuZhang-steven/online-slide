
import { prisma } from "@/prisma/prisma";
import { Page } from "@prisma/client";
import addNewPages from "./addNewPages";

type Props = {
    presentationId: string;
}

export default async function fetchingAllPages(
    { presentationId }: Props
) {
    //the pages array to return
    let pages: Page[] = []
    try {
        //get all pages for the presentation ordered by 'order' field
        const res = await prisma.page.findMany({
            where: { presentationId },
            orderBy: { order: 'asc' }
        });
        pages = res;
        //if no pages, create the first page
        if (pages.length < 1) {
            const createFirstPage = await addNewPages({ presentationId });
            if (createFirstPage.status === '201' && createFirstPage.data) {
                pages.push(createFirstPage.data);
            }
        }
        return { status: '200', data: pages };
    } catch (error) {
        return { status: '500', error: 'Internal Server Error' };
    }


}
