import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";

type Props = {
    title: string;
    date: string

}

export default function PresentationCard({ title, date }: Props) {
    return (
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
    )
}
