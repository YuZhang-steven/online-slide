import { Content } from "@prisma/client";
export interface ContentLocal extends Content {
    img?: HTMLImageElement
    video?: HTMLVideoElement
}

export const contentsMap = new Map<string, ContentLocal>();