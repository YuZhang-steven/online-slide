

export default function EditorFrame(
    { children }: { children?: React.ReactNode }
) {
    return (

        <div
            id="editor-frame"
            className="fixed h-full w-full bg-amber-300
            flex
            "
        >
            <div
                id="editor-sidebar"
                className="h-full w-64 bg-emerald-500"
            >
            </div>
            <div
                id="editor-content-area"
                className="flex-1 flex flex-col"
            >
                <div
                    id="editor-toolbar-top"
                    className="h-20 w-full bg-blue-500"
                >

                </div>
                <div>{children}</div>

            </div>

        </div>
    )
}
