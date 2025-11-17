import { s3Client } from "@/lib/s3Client";
import { uploadToR2Schema } from "@/lib/zod/schemas";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(request: Request) {
    let body
    try {
        body = await request.json();
    } catch (error) {
        return new Response("Bad Request: Invalid JSON", { status: 400 });
    }

    const parseResult = uploadToR2Schema.safeParse(body);
    if (!parseResult.success) {
        return new Response("Bad Request: " + JSON.stringify(parseResult.error.issues), { status: 400 });
    }

    const { name, type, data } = parseResult.data;
    if (!name || !type || !data) {
        return new Response("Bad Request: Missing fields", { status: 400 });
    }
    const buffer = Buffer.from(data, 'base64');
    try {
        const command = new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: name,
            Body: buffer,
            ContentType: type,
            ACL: 'public-read'
        });
        await s3Client.send(command);

        const url = `${process.env.R2_PUBLIC_URL}/${name}`;
        return new Response(JSON.stringify(
            { url }),
            {
                status: 201,
                headers: { 'Content-Type': 'application/json' }
            });

    } catch (error) {
        console.error("Error uploading to R2:", error);
        return new Response("Internal Server Error", { status: 500 });
    }

}