"use server"
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
        return presentations;
    } catch (error) {
        // Log the error for server-side debugging
        console.error("Error fetching presentations:", error);
        // Re-throw the error to be caught by the calling component
        throw new Error('Failed to retrieve presentations from the database.');
    }
}
