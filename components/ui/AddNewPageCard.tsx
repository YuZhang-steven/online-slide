
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
             bg-sky-100  hover:bg-sky-200 
             transition-color duration-200
              shadow-md
             
             "
            onClick={handleAddNewPage}
        >


            <CardFooter
                className="flex flex-col items-center"

            >
                <p>+</p>
                <p> Add New Page </p>
            </CardFooter>
        </Card>
    )
}
