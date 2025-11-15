import EditorFrame from "@/components/EditorFrame";


export default async function PresentationLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: { id: string };
}>) {
    const { id } = await params;
    return <>
        <EditorFrame id={id}>
            {children}
        </EditorFrame>

    </>;
}