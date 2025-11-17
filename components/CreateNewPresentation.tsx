"use client";


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
        <button onClick={createPresentation}>
            Create a new presentation
        </button>
    );
}
