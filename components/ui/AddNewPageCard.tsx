
import { Card, CardFooter } from "./card"
type Props = {
    presentationId: string
    pageList: string[]
    setPageList: (pages: string[]) => void
}

/**
 * Card component for adding a new page to a presentation.
 * 
 * When clicked, it sends a POST request to create a new page in the backend.
 * On success, the new page ID is appended to the current page list using `setPageList`.
 *
 * @param {Props} props - Component props
 * @param {string} props.presentationId - ID of the current presentation
 * @param {string[]} props.pageList - Current list of page IDs
 * @param {(pages: string[]) => void} props.setPageList - Function to update the page list state
 * @returns {JSX.Element} A card that adds a new page when clicked
 */

export default function AddNewPageCard({
    presentationId, pageList, setPageList }: Props) {
    /**
        * Handles the click event to add a new page.
        * Sends a POST request to the API, and updates the page list state on success.
        */
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
