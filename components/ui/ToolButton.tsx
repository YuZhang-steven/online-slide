import React from 'react'

/**
 * A reusable button component styled with a rounded background, hover effects, 
 * and shadow. Designed to wrap icons or other small UI elements.
 *
 * @param {React.ReactNode} [props.children] - Optional content to display inside the button
 * @param {() => void} [props.onClick] - Optional callback invoked when the button is clicked
 */

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
