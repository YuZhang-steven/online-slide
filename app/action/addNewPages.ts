"use server";

import { prisma } from "@/prisma/prisma";

type Props = {

    presentationId: string;
}

export default async function addNewPages({
    presentationId
}: Props) {
    try {
        //find a the last page
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
