"use client";
import Link from "next/link";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";

type Props = {
    id: string;
    title: string;
    date: string

}

export default function PresentationCard({ id, title, date }: Props) {

    // function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    //     e.preventDefault();
    //     //navigate to presentation page
    //     console.log(`Navigating to presentation with id: ${id}`);
    // }
    return (
        <Link
            href={`/presentations/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer over:scale-102
             transition-transform duration-200"
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
        </Link>
        // <div
        //     className="cursor-pointer 
        //     hover:scale-102
        //     transition-transform
        //     duration-200
        //     "
        //     onClick={handleClick}
        // >

        // </div>
    )
}
