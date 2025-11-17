
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
        try {
            const res = await fetch(`/api/presentations/${presentationId}/pages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!res.ok) {
                console.error('Failed to add new page');
                return;
            }
            const data = await res.json();
            console.log('New page added:', data);
            setPageList([...pageList, data.id]);
        } catch (error) {
            console.error('Error adding new page:', error);
        }
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
