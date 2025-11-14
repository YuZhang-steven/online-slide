import { prisma } from "@/prisma/prisma";

export async function GET() {
    const presentations = await prisma.presentation.findMany();
    console.log(presentations);


    return new Response(JSON.stringify(presentations));

}
export async function POST(
    request: Request

) {
    const body = await request.json();


    return new Response("Create a new Presenttion!");
}