import { Content } from "@prisma/client";
export interface ContentLocal extends Content {
    img?: HTMLImageElement
    video?: HTMLVideoElement
}

export const contentsMap = new Map<string, ContentLocal>();

export function packageContentArray(): Content[] {
    const contentsArray: Content[] = [];
    contentsMap.forEach((content) => {
        const { img, video, ...rest } = content;
        contentsArray.push(rest);
    });
    return contentsArray;
}