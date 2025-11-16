import addNewPages from "@/app/action/addNewPages";
import { NextRequest, NextResponse } from "next/server";


export async function POST(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const res = await addNewPages({ presentationId: id });

        if (!res || !res.data) {
            return new NextResponse("Failed to add new page", { status: 500 });
        }

        return new NextResponse(JSON.stringify(res.data), { status: 201 });
    } catch (err) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}