import { prisma } from "@/prisma/prisma";

export default async function fetchingAllPresentations() {
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
