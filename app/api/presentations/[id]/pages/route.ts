import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";


export async function POST(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        //find a the last page
        const maxPage = await prisma.page.findFirst({
            where: { presentationId: id },
            orderBy: { order: 'desc' }
        })

        const newOrder = maxPage ? maxPage.order + 1 : 1;
        const addNewPage = await prisma.page.create({
            data: {
                order: newOrder,
                presentation: { connect: { id } }
            }
        })
        return new NextResponse(JSON.stringify(addNewPage), { status: 201 });
    } catch (err) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(

) {
    return new Response("Delete a Presenttion!");
}