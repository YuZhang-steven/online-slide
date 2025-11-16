

import addNewPages from "@/app/action/addNewPages";
import { Card, CardFooter } from "./card"
type Props = {
    presentationId: string
    pageList: string[]
    setPageList: (pages: string[]) => void
}

export default function AddNewPageCard({
    presentationId, pageList, setPageList }: Props) {
    async function handleAddNewPage() {
        const res = await addNewPages({ presentationId })
        if (res.status !== '201') {
            console.error('Failed to add new page')
            return
        }
        console.log('New page added:', res.data);
        const newPageId = (pageList.length + 1).toString()
        setPageList([...pageList, newPageId])

    }
    return (
        <Card
            className="cursor-pointer 
            p-2 m-2
             bg-purple-200  hover:bg-purple-300
             transition-transform duration-200
             flex flex-col items-center
             "
            onClick={handleAddNewPage}
        >


            <CardFooter>
                <p>+</p>
                <p> Add New Page </p>
            </CardFooter>
        </Card>
    )
}
