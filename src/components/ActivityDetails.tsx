import React from "react"
import { ActivityType } from "../types/response.types"

type ActivityDetailsPropType = Omit<ActivityType, "geocode">

export function ActivityDetails({
  location,
  description,
}: ActivityDetailsPropType) {
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
