import fetchingAllPages from "@/action/fetchingAllPages";
import EditorFrame from "@/components/EditorFrame";
import { Page } from "@prisma/client";

/**
 * Layout component for a presentation.
 * Fetches all pages for the given presentation ID and wraps
 * add a EditorFrame around the children components.
 *
 * @async
 * @function PresentationLayout
 * @param {Object} props
 * @param {React.ReactNode} props.children - Nested React nodes to render inside the layout.
 * @param {Promise<{ id: string }>} props.params - Route parameters containing the presentation ID.
 * @returns {Promise<JSX.Element>} The layout component wrapping children with fetched pages.
 */

export default async function PresentationLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}>) {
    const { id } = await params;
    //fetch all presentation pages
    const fetchPagesRes = await fetchingAllPages({ presentationId: id });
    let presentationPages: Page[] = []

    if (fetchPagesRes.status === '200' && fetchPagesRes.data) {
        presentationPages = fetchPagesRes.data;
    }
    return <div className="">
        <EditorFrame id={id} fetchedPages={presentationPages}>
            {children}
        </EditorFrame>

    </div>;
}