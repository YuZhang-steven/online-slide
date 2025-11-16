import { useCurrentPageContents } from "../globalState/useCurrentPageContents"

export default function RenderingImageContent() {
    const imageContentIDs = useCurrentPageContents((state) => state.imageContents)

    return (
        <></>
    )
}
