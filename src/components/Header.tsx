import React from "react"

type HeaderPropType = {
  heading: string
  description?: string
}

export function Header({ heading, description }: HeaderPropType) {
  return (
    <div className="section-title">
      <h2>{heading}</h2>
      {description ? (
        <p>
          <strong>{description}</strong>
        </p>
      ) : (
        ""
      )}
    </div>
  )
}
