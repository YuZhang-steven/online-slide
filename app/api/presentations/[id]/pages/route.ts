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

        // create a new page with order +1
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
    request: NextRequest,
) {
    const body = await request.json();
    const { pageId } = body

    if (!pageId) {
        return new Response("Bad Request: Missing pageId", { status: 400 });
    }

    try {

        await prisma.page.delete({
            where: { id: pageId }
        });
        return new Response("Presentation Deleted!", { status: 200 });
    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
}