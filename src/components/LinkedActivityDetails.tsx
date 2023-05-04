import React from "react"
import { Link } from "react-router-dom"

type LinkedActivityDetailPropType = {
  location: string
  destination: string
  description: string
  custom?: boolean | undefined
}

export function LinkedActivityDetails({
  location,
  destination,
  description,
  custom,
}: LinkedActivityDetailPropType) {
  return (
    <div className="activty-container">
      <p>
        <strong>{location}</strong>
      </p>
      <i>{description}</i>
      <br></br>
      {custom ? (
        ""
      ) : (
        <Link
          to={`/poi/${encodeURIComponent(location)}/${encodeURIComponent(
            destination
          )}`}
          target="_blank"
          rel="noopener"
          className="details-link"
        >
          Discover more
        </Link>
      )}
    </div>
  )
}
