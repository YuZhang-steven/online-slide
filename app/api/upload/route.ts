import { s3Client } from "@/lib/s3Client";
import { DeleteFileeFromR2Schema, uploadToR2Schema } from "@/lib/zod/schemas";
import { DeleteObjectCommand, DeleteObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";

/**
 * Uploads a file to Cloudflare R2 storage.
\
 * @async
 * @function POST
 * @param {Request} request - Incoming request containing base64 file data, name, and type.
 * @returns {Promise<Response>}
 * - 201 with JSON `{ url: string }` for the uploaded file
 * - 400 if request body is invalid or missing required fields
 * - 500 on server error
 */
export async function POST(request: Request): Promise<Response> {
    // Parse and validate request body
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

    // Extract validated fields
    const { name, type, data } = parseResult.data;
    if (!name || !type || !data) {
        return new Response("Bad Request: Missing fields", { status: 400 });
    }

    // Upload to R2
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
            { url, name }),
            {
                status: 201,
                headers: { 'Content-Type': 'application/json' }
            });

    } catch (error) {
        console.error("Error uploading to R2:", error);
        return new Response("Internal Server Error", { status: 500 });
    }

}

export async function DELETE(request: Request): Promise<Response> {
    let body;
    try {
        body = await request.json();
    } catch (error) {
        return new Response("Bad Request: Invalid JSON", { status: 400 });
    }

    //validate with zon
    const parseResult = DeleteFileeFromR2Schema.safeParse(body);
    if (!parseResult.success) {
        return new Response("Bad Request: " + JSON.stringify(parseResult.error.issues), { status: 400 });
    }
    const { keys } = parseResult.data;


    try {
        const command = new DeleteObjectsCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Delete: {
                Objects: keys.map((key) => ({ Key: key })),
                Quiet: false,
            },
        })

        const res = await s3Client.send(command);
        if (!res) {
            return new Response("Error deleting files", { status: 500 });
        }

        if (res.Errors && res.Errors.length > 0) {
            console.log("Some errors occurred while deleting files:", res.Errors);
        }

        return new Response(
            JSON.stringify({
                message: "Files deleted",
                deleted: res.Deleted,
                errors: res.Errors || []
            }), { status: 200 });


    } catch (error) {
        console.error("Error deleting from R2:", error);
        return new Response("Internal Server Error", { status: 500 });
    }

}