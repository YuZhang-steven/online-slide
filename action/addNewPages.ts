"use server";
import { prisma } from "@/prisma/prisma";

type Props = {
    presentationId: string;
}

/**
 * Creates a new page inside a presentation and assigns it the next available order number.
 *
 * Next.js Server Action
 * @async
 * @function addNewPages
 * @param {string} props.presentationId - The ID of the presentation to update.
 * @returns {Promise<{status: string, data?: prisma.Page, error?: string}>}
 * Returns a 201 status with the new page data, or a 500 error object.
 */

export default async function addNewPages({
    presentationId
}: Props) {
    try {
        //find the last page
        const maxPage = await prisma.page.findFirst({
            where: { presentationId },
            orderBy: { order: 'desc' }
        })
        const newOrder = maxPage ? maxPage.order + 1 : 1;
        const addNewPage = await prisma.page.create({
            data: {

                order: newOrder,
                presentation: {
                    connect: { id: presentationId }
                }
            }
        })

        return { status: '201', data: addNewPage };
    } catch (error) {
        return { status: '500', error: 'Internal Server Error' };
    }
}
