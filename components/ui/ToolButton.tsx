import React from 'react'
type Props = {
    children?: React.ReactNode
    onClick?: () => void
}
export default function ToolButton({ children, onClick = () => { } }: Props) {
    return (
        <div
            className="
      w-15 h-15 m-2  rounded
     flex justify-center items-center
       bg-gray-200 hover:bg-sky-200 
      cursor-pointer
      transition-colors duration-300
      shadow-md

    "
            onClick={onClick}
        >
            {children}
        </div>

    )
}
