import React from "react"

export function Button({ children, onClick, className = "", size = "md", ...props }) {
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  }

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
