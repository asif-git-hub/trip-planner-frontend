import React from "react"
import { ActivityType } from "../types/response.types"

export function ActivityDetails({ location, description }: ActivityType) {
  return (
    <div className="activty-container">
      <p>
        <strong>{location}</strong>
      </p>
      <i>{description}</i>
      <br></br>
    </div>
  )
}
