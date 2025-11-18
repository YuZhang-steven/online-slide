"use server"
import SlideCanvas from "@/components/SlideCanvas"

/**
 * Server Component for the presentation editor page.
 * Renders the `SlideCanvas` for the given presentation ID.
 *
 * @async
 * @function EditorPage
 * @param {Object} props
 * @param {Promise<{ id: string }>} props.params - Route parameters containing the presentation ID.
 * @returns {Promise<JSX.Element>} The page component rendering the SlideCanvas.
 */
export default async function EditorPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    // Extract presentation ID from route parameters
    const { id } = await params
    return <div className="flex-1 flex ">
        <SlideCanvas presentationID={id} />
    </div>
}