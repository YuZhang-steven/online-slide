
import { prisma } from "@/prisma/prisma";

type Props = {
    presentationId: string;
}

export default async function fetchingAllPages(
    { presentationId }: Props
) {
    try {
        const pages = await prisma.page.findMany({
            where: { presentationId },
            orderBy: { order: 'asc' }
        });
        return { status: '200', data: pages };
    } catch (error) {
        return { status: '500', error: 'Internal Server Error' };
    }


}
