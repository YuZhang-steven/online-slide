"use server"
import CreateNewPresentation from "@/components/CreateNewPresentation";
import { Presentation, PresentationsSchema } from "../../lib/zod/schemas";

import fetchingAllPresentations from "../../action/fetchingAllPresentations";
import PresentationCard from "@/components/ui/PresentationCard";
import dateFormater from "@/lib/helper/dateFormater";

export default async function PresetationPage() {
    const res = await fetchingAllPresentations()
    if (!res.ok) {
        throw new Error('Failed to fetch presentations');
    }

    const json = await res.json();
    //validte with Zod
    const data: Presentation[] = PresentationsSchema.parse(json);

    return (
        <div>
            <div
                id="presentations-grid"
                className="
                grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4
                gap-4 m-4
                 "
            >
                <CreateNewPresentation />
                {
                    data.map((presentation) => {
                        const date = dateFormater(presentation.updatedAt)
                        return (
                            <PresentationCard
                                key={presentation.id}
                                id={presentation.id}
                                title={presentation.title}
                                date={date}
                            />)
                    }
                    )
                }
            </div>
        </div>

    )
}
