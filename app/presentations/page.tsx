import CreateNewPresentation from "@/components/CreateNewPresentation";
import { Presentation, PresentationsSchema } from "../lib/zod/schemas";

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

            <div>Presentations Loaded: {data.length}</div>
            <CreateNewPresentation />
        </div>

    )
}
