import { ContentLocal } from "./contentsMap";

/**
 * A global Set to track all deleted content objects.
 * 
 * This is useful for:
 * - Keeping track of content removed from the editor.
 * - Updating the database or storage (e.g., deleting from R2/S3) in batch.
 */
export const deletedContentSet = new Set<ContentLocal>();

/**
 * Get an array of IDs for all deleted contents.
 */
export function getDeletedContentsIDArray() {
    return Array.from(deletedContentSet).map(content => content.id);
}

/**
 * Get an array of URLs for all deleted contents.
 * Useful if you want to remove files from cloud storage.
 */
export function getDeletedContentsUrlArray() {
    return Array.from(deletedContentSet).map(content => content.url);
}