import { Card, CardFooter } from "./card"

type Props = {
    pageId?: string
    footer?: string | number

}

export default function PageCard({
    pageId, footer, }: Props) {
    function handleClick() {
        console.log('Page card clicked:', pageId);
        // You can add navigation or other logic here
    }
    return (
        <Card
            className="cursor-pointer 
            p-2 m-2
             bg-purple-200  hover:bg-purple-300
             transition-transform duration-200
             flex flex-col items-center
             "
            onClick={handleClick}
        >
            <div
                className="h-20 w-50 bg-muted"
            />
            <CardFooter>
                <p>{footer}</p>
            </CardFooter>
        </Card>
    )
}
