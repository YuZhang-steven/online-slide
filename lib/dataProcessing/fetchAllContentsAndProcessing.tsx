import { contentsMap } from "@/components/globalState/contentsMap";
import { Prisma } from "@prisma/client";

type Props = {
    pageID: string;
    presentationID: string;
}
type PageWithContent = Prisma.PageGetPayload<{
    include: {
        content: true;
    };
}>;

export default async function fetchAllContentsAndProcessing({ pageID, presentationID }: Props) {
    // Fetch contents from the API
    const data = await fetchContents(pageID, presentationID);
    // create separate arrays for each content type
    const textIDs: string[] = []
    const imageIDs: string[] = []
    const videoIDs: string[] = []

    if (!data) {
        return {
            textIDs,
            imageIDs,
            videoIDs,
        }
    }
    const contents = data.content;



    // Process and categorize contents by type, then store in contentsMap
    contents.forEach((contentItem) => {
        switch (contentItem.type) {
            case "TEXT":
                textIDs.push(contentItem.id);
                break;
            case "IMAGE":
                imageIDs.push(contentItem.id);
                break;
            case "VIDEO":
                videoIDs.push(contentItem.id);
                break;
            default:
                console.warn(`Unsupported content type: ${contentItem.type}`);
                return;
        }
        contentsMap.set(contentItem.id, contentItem);
    });
    return {
        textIDs,
        imageIDs,
        videoIDs,
    };
}



async function fetchContents(pageID: string, presentationId: string): Promise<PageWithContent | null> {
    try {
        const res = await fetch(`/api/presentations/${presentationId}/pages?pageID=${pageID}`, {
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