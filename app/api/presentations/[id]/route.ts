import { prisma } from "@/prisma/prisma";
import { NextRequest } from "next/server";

/**
 * Retrieves a presentation by its ID.
 * @async
 * @function GET
 * @param {NextRequest} request - Incoming request.
 * @param {{ params: Promise<{ id: string }> }} context - Route parameters.
 * @returns {Promise<Response>}
 * - 200 with presentation data
 * - 404 if not found
 * - 500 on server error
 */
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
): Promise<Response> {
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

/**
 * Deletes a presentation by its ID.
 * @async
 * @function DELETE
 * @param {NextRequest} request - Incoming request.
 * @param {{ params: Promise<{ id: string }> }} context - Route parameters.
 * @returns {Promise<Response>}
 * - 200 on success
 * - 400 if ID is missing
 * - 500 on server error
 */
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
): Promise<Response> {
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
