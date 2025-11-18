import { S3Client } from "@aws-sdk/client-s3";
/**
 * Configured S3 client instance for interacting with Cloudflare R2 storage.
 *
 * Uses AWS SDK v3 `S3Client` with credentials and endpoint provided
 * via environment variables. Region is ignored by R2, so "auto" is used.
 *
 * Environment Variables:
 * - R2_ENDPOINT: The R2 bucket endpoint (e.g., https://<accountid>.r2.cloudflarestorage.com)
 * - R2_ACCESS_KEY_ID: Access key ID for R2
 * - R2_SECRET_ACCESS_KEY: Secret key for R2
 *
 * Example usage:
 * ```ts
 * import { s3Client } from './s3Client';
 * import { PutObjectCommand } from '@aws-sdk/client-s3';
 *
 * const command = new PutObjectCommand({
 *   Bucket: 'my-bucket',
 *   Key: 'file.txt',
 *   Body: 'Hello R2!',
 * });
 * await s3Client.send(command);
 * ```
 * */

export const s3Client = new S3Client({
    region: "auto", // R2 ignores this, can be "auto"
    endpoint: process.env.R2_ENDPOINT, // e.g., https://<accountid>.r2.cloudflarestorage.com
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!
    }
});