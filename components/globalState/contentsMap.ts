import { Content } from "@prisma/client";

export interface ContentLocal extends Content {
    img?: HTMLImageElement
    video?: HTMLVideoElement
}
/**
 * A global Map to manage all content objects in memory.
 * Keys are content IDs, values are ContentLocal objects.
 * This is used for:
 *  - Rendering content on the slide canvas
 *  - Tracking transformations, drags, and edits
 *  - Synchronizing local canvas state with backend data
 */
export const contentsMap = new Map<string, ContentLocal>();

/**
 * Converts the contentsMap into a plain array of Content objects,
 * stripping out any runtime HTML element references (`img` and `video`).
 * Useful for sending data back to the server for saving/updating.
 *
 * @returns {Content[]} Array of Prisma-compatible Content objects
 */
export function packageContentArray(): Content[] {
    const contentsArray: Content[] = [];
    contentsMap.forEach((content) => {
        const { img, video, ...rest } = content;
        contentsArray.push(rest);
    });
    return contentsArray;
}