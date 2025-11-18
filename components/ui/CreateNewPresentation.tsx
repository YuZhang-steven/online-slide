"use client";
import { Card, CardTitle } from "./card";

/**
 * Card component to create a new presentation.
 *
 * When clicked, it sends a POST request to the `/api/presentations` endpoint
 * to create a new presentation with a timestamped title.
 * On success, the page reloads to reflect the new presentation.
 *
 * @returns {JSX.Element} A card that creates a new presentation when clicked.
 */

export default function CreateNewPresentation() {
    const title = "New Presentation" + Date.now();
    /**
     * Handles click events to create a new presentation
     */
    async function createPresentation(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation()
        try {
            const res = await fetch("/api/presentations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                }),
            });
            if (!res.ok) {
                console.error("Failed to create presentation");
                return;
            }
            window.location.reload();
        } catch (error) {
            console.error("Error creating presentation:", error);
        }
    }

    return (
        <Card
            className="
                relative group
                cursor-pointer hover:scale-102
                flex items-center justify-center
                bg-gray-200/60 hover:bg-sky-200 text-gray-700
                transition-color duration-200
                shadow-lg 
             "

            onClick={createPresentation}
        >
            <CardTitle>  Create a new presentation</CardTitle>
            <CardTitle>  + </CardTitle>
        </Card>
    );
}
