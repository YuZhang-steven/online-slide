import SlideCanvas from "@/components/SlideCanvas"


export default async function EditorPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params


    return <div className="h-full w-full ">
        <SlideCanvas />
    </div>
}