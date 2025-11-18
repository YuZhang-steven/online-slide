"use client";

import { Card, CardTitle } from "./ui/card";


export default function CreateNewPresentation() {
    const title = "New Presentation" + Date.now();
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
        // <button onClick={createPresentation}>

        // </button>
    );
}
