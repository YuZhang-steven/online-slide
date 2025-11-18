import { CreatePresentationSchema } from "@/lib/zod/schemas";
import { prisma } from "@/prisma/prisma";
import z from "zod";

/**
 * Retrieves all presentations from the database.
 * @async
 * @function GET
 * @returns {Promise<Response>}
 * - 200 with an array of presentations
 * - 500 on server error
 */
export async function GET(): Promise<Response> {
    try {
        const presentations = await prisma.presentation.findMany();
        return new Response(JSON.stringify(presentations), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({
            error: 'Internal Server Error'
        }), {
            status: 500, headers: { 'Content-Type': 'application/json' }
        });
    }

}

/**
 * Creates a new presentation.

 * @async
 * @function POST
 * @param {Request} request - Incoming request containing presentation data.
 * @returns {Promise<Response>}
 * - 201 with the newly created presentation
 * - 400 if request body is invalid (Zod validation error)
 * - 500 on server error
 */

export async function POST(
    request: Request
): Promise<Response> {
    try {
        const body = await request.json();
        const validatedData = CreatePresentationSchema.parse(body);
        const newPresentation = await prisma.presentation.create({
            data: {
                title: validatedData.title,
            }
        })
        return new Response(JSON.stringify(newPresentation), { status: 201 });
    } catch (error) {
        //treat zod validation errors
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify({ error: error }), { status: 400 });
        }
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}