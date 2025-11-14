"use client";

export default function CreateNewPresentation() {
    const title = "New Presentation" + Date.now();
    async function createPresentation() {
        console.log("creating presentation");

        const res = await fetch("/api/presentations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
            }),
        });

        const data = await res.json();
        console.log("Created:", data);
    }
    return (
        <button onClick={createPresentation}>
            Create a new presentation
        </button>
    );
}
