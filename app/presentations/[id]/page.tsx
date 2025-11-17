"use server"
import SlideCanvas from "@/components/SlideCanvas"
export default async function EditorPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params



    return <div className="flex-1 flex ">
        <SlideCanvas presentationID={id} />
    </div>
}