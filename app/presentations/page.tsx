"use client"
import CreateNewPresentation from "@/components/ui/CreateNewPresentation";
import { Presentation, PresentationsSchema } from "../../lib/zod/schemas";
import PresentationCard from "@/components/ui/PresentationCard";
import dateFormater from "@/lib/helper/dateFormater";
import { useEffect, useState } from "react";

/**
 * Server Component page that displays all presentations.
 * Fetches presentations from the database, validates with Zod,
 * and renders a grid of `PresentationCard` components along with
 * a `CreateNewPresentation` component.
 *
 * @async
 * @function PresetationPage
 * @returns {Promise<JSX.Element>} The page component rendering the presentations grid.
 *
 * @throws {Error} Throws an error if fetching presentations fails.
 */

export default function PresetationPage() {
    const [data, setData] = useState<Presentation[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the data from the newly created API route
                const response = await fetch('/api/presentations');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const json = await response.json();

                // Validate with Zod
                const validatedData = PresentationsSchema.parse(json);
                setData(validatedData);
            } catch (err) {
                console.error("Client fetch error:", err);

            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) return <div>Loading presentations...</div>;


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
