import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";

type Props = {
    title: string;
    date: string

}

export default function PresentationCard({ title, date }: Props) {


    return (
        <div
            className="cursor-pointer 
            hover:scale-102
            transition-transform
            duration-200
            "
        >
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <div
                    className="h-40 bg-muted"
                />
                <CardFooter>
                    <p>{date}</p>
                </CardFooter>
            </Card>
        </div>
    )
}
