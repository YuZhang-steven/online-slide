import { CreatePresentationSchema } from "@/app/lib/zod/schemas";
import { prisma } from "@/prisma/prisma";
import z from "zod";

export async function GET() {
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

export async function POST(
    request: Request
) {
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