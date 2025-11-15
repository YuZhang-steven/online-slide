import addNewPages from "@/app/action/addNewPages";

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    const res = await addNewPages({ presentationId: id });
    if (!res || !res.data) {
        return new Response('Failed to add new page', { status: 500 });
    }
    return new Response(JSON.stringify(res.data), { status: 201 });
}