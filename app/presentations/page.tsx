import CreateNewPresentation from "@/components/CreateNewPresentation";
import { Presentation, PresentationsSchema } from "../lib/zod/schemas";
import PresentationCard from "@/components/PresentationCard";

export default async function PresetationPage() {
    const res = await fetch(`${process.env.BASE_URL}/api/presentations`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) {
        throw new Error('Failed to fetch presentations');
    }

    const json = await res.json();

    //validte with Zod
    const data: Presentation[] = PresentationsSchema.parse(json);
    console.log(data);







    return (
        <div>
            <div
                id="presentations-grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4"
            >
                {
                    data.map((presentation) => (
                        <PresentationCard
                            key={presentation.id}
                            id={presentation.id}
                            title={presentation.title}
                            date={presentation.updatedAt}
                        />

                    ))
                }
            </div>


            <div>Presentations Loaded: {data.length}</div>
            <CreateNewPresentation />
        </div>

    )
}
