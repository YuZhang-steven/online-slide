import { prisma } from "@/prisma/prisma";
import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    try {
        const presentation = await prisma.presentation.findUnique({
            where: { id },
        })

        if (!presentation) {
            return new Response(
                JSON.stringify({ error: 'Presentation not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(
            JSON.stringify(presentation), {
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
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    if (!id) {
        return new Response("Bad Request: Missing presentation ID", { status: 400 });
    }

    try {
        await prisma.presentation.delete({
            where: { id }
        });
        return new Response("Presentation Deleted!", { status: 200 });
    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
}
export async function PUT() {
    return new Response("presentation update not works");
}