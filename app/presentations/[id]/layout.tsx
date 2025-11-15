import EditorFrame from "@/components/EditorFrame";


export default function PresentationLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
        <EditorFrame>
            {children}
        </EditorFrame>

    </>;
}