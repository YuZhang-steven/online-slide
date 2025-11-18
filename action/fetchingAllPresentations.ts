import { prisma } from "@/prisma/prisma";

/**
 * Retrieves all presentations from the database.
 *  Server Function.
 *
 * @async
 * @function fetchingAllPresentations
 * @returns {Promise<Response>}
 * - 200 with a JSON array of presentations
 * - 500 with an error message
 */

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
