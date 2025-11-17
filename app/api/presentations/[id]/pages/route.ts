import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { UpdatePageSchema } from "@/lib/zod/schemas";
import { ca } from "zod/locales";



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
    const { pageID } = body

    if (!pageID) {
        return new Response("Bad Request: Missing pageID", { status: 400 });
    }

    try {
        await prisma.page.delete({
            where: { id: pageID }
        });
        return new Response("Presentation Deleted!", { status: 200 });
    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

// get pages and all its connected content
export async function GET(
    request: NextRequest,
) {
    const { searchParams } = new URL(request.url);
    const pageID = searchParams.get("pageID");

    if (!pageID) {
        return new Response("Bad Request: Missing pageID", { status: 400 });
    }
    try {
        const pageWithContent = await prisma.page.findUnique({
            where: { id: pageID },
            include: {
                content: true,
            },
        });

        if (!pageWithContent) {
            return new Response(
                JSON.stringify({ error: 'Page not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(
            JSON.stringify(pageWithContent), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function PUT(
    request: NextRequest,
) {
    // get pageID from url query
    const { searchParams } = new URL(request.url);
    const pageID = searchParams.get("pageID");
    if (!pageID) {
        return new Response("Bad Request: Missing pageID", { status: 400 });
    }

    let data;
    try {
        const json = await request.json();
        data = UpdatePageSchema.parse(json);
    } catch (error) {
        return new Response("Bad Request: Invalid data", { status: 400 });

    }

    const { order, contents, deletedContentIds } = data;

    try {
        await prisma.$transaction(async (tx) => {
            //1.delete 
            if (deletedContentIds && deletedContentIds.length > 0) {
                await tx.content.deleteMany({
                    where: {
                        id: { in: deletedContentIds },
                        pageId: pageID
                    }
                });
            }
            //2.upsert
            for (const item of contents) {
                if (item.id.startsWith("New_")) {
                    await tx.content.create({
                        data: { ...item, pageId: pageID }
                    })
                } else {
                    await tx.content.update({
                        where: { id: item.id },
                        data: { ...item }
                    })
                }
            }
            //3.update page metadata
            await tx.page.update({
                where: { id: pageID },
                data: { order }
            });
            return new Response("Page Updated", { status: 200 });
        });
    } catch (error) {
        console.error("Error updating page:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}