"use client";
import Link from "next/link";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";

type Props = {
    id: string;
    title: string;
    date: string

}

export default function PresentationCard({ id, title, date }: Props) {

    return (
        <Link
            href={`/presentations/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"

        >
            <Card
                className="cursor-pointer hover:scale-110
             transition-transform duration-200
             "
            >
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
        </Link>
    )
}
