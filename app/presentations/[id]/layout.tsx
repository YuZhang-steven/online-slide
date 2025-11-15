import fetchingAllPages from "@/app/action/fetchingAllPages";
import EditorFrame from "@/components/EditorFrame";
import { Page } from "@prisma/client";


export default async function PresentationLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: { id: string };
}>) {
    const { id } = await params;
    //fetch all presentation pages
    const fetchPagesRes = await fetchingAllPages({ presentationId: id });
    let presentationPages: Page[] = []

    if (fetchPagesRes.status === '200' && fetchPagesRes.data) {
        presentationPages = fetchPagesRes.data;
    }
    return <>
        <EditorFrame id={id} fetchedPages={presentationPages}>
            {children}
        </EditorFrame>

    </>;
}