"use client";
import Link from "next/link";
import { Card, CardFooter, CardHeader, CardTitle } from "./card";
/**
 * Component representing a single presentation card.
 *
 * Displays the title, date, and a preview area for the presentation.
 * Allows opening the presentation in a new tab or deleting it.
 *
 * @param {string} props.id - The unique ID of the presentation
 * @param {string} props.title - The title of the presentation
 * @param {string} props.date - The creation or modification date of the presentation
 */

type Props = {
    id: string;
    title: string;
    date: string

}

export default function PresentationCard({ id, title, date }: Props) {

    /**
     * Handles deleting the presentation.
     *
     * Prompts the user for confirmation before sending a DELETE request.
     * Refreshes the page list on success.
     *
     * @param {React.MouseEvent} e - The mouse click event
     * @param {string} id - The ID of the presentation to delete
     */

    async function handleDelete(e: React.MouseEvent, id: string) {
        e.preventDefault();
        e.stopPropagation()
        const confirmed = window.confirm(
            "Are you sure you want to delete this presentation? This action cannot be undone."
        );
        if (!confirmed) {
            return;
        }
        try {
            const res = await fetch(`/api/presentations/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                console.error('Failed to delete presentation');
                return;
            }
            //  refresh the list
            window.location.reload();
        } catch (error) {
            console.error('Error deleting presentation:', error);
        }

    }

    return (
        <Link
            href={`/presentations/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"

        >
            <Card
                className="
                relative group
                cursor-pointer hover:scale-102
                bg-gray-200/60 text-gray-700  
                shadow-lg hover:bg-sky-200 
                transition-color duration-200
             "
            >
                <button
                    className=" 
                absolute top-2 right-2 z-10 
                w-10 h-10 rounded-lg flex items-center justify-center
                bg-gray-100 hover:bg-gray-200 text-gray-300 hover:text-gray-600
                opacity-0 group-hover:opacity-100 hover:opacity-100
                transition-color duration-150
                cursor-pointer 
                "
                    onClick={(e) => handleDelete(e, id)}
                >
                    X
                </button>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <div
                    className="h-40 bg-muted"
                />
                <CardFooter>
                    <p>{date}</p>
                </CardFooter>
            </Card>
        </Link>
    )
}
