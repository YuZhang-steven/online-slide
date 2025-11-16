import React from 'react'

export default function ToolButton({ children }: { children?: React.ReactNode }) {
    return (
        <div
            className="
      w-15 h-15 m-2  rounded
     flex justify-center items-center
     bg-white/30
      hover:bg-white/60
      cursor-pointer
      transition-colors duration-300

    "
        >
            {children}
        </div>

    )
}
