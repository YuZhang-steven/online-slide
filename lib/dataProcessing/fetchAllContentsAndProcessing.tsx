import { Content, Prisma, ContentType } from "@prisma/client";

type Props = {
    pageID: string;
}
type PageWithContent = Prisma.PageGetPayload<{
    include: {
        content: true;
    };
}>;

export default async function fetchAllContentsAndProcessing({ pageID }: Props) {
    const data = await fetchContents(pageID);
    if (!data) {
        return null;
    }
    const contents = data.content;



}

// function processContentItem(contentItem: Content) {
//     switch (contentItem.type) {
//         case ContentType.IMAGE:
//             const img = new Image();
//             img.src = contentItem.src;
//             return { ...contentItem, img };
//         case ContentType.VIDEO:
//             const video = document.createElement("video");
//             video.src = contentItem.src;
//             return { ...contentItem, video };
//         case ContentType.TEXT:

//         default:
//             return contentItem;
//     }
// }

async function fetchContents(pageID: string) {
    try {
        const res = await fetch(`/api/pages?pageID=${pageID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            console.error("Failed to fetch contents");
            return null;
        }
        const data: PageWithContent = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching contents:", error);
        return null;
    }
}