import { s3Client } from "@/lib/s3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(request: Request) {
    const { name, type, data } = request.body
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