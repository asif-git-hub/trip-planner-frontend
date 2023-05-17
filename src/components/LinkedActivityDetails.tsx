import React from "react"
import { ActivityType } from "../types/response.types"
import { EditActivity } from "./EditActivity"

type LinkedActivityDetailPropType = {
  location: string
  destination: string
  description: string
  custom?: boolean | undefined
  dailyActivities: ActivityType[]
  activityId: number
  dayId: number
}

export function LinkedActivityDetails({
  location,
  destination,
  description,
  custom,
  dailyActivities,
  activityId,
  dayId,
}: LinkedActivityDetailPropType) {
  return (
    <div className="activty-container">
      <p>
        <strong>{location}</strong>
      </p>
      <i>{description}</i>

      <EditActivity
        dailyActivities={dailyActivities}
        currentOrder={activityId}
        dayId={dayId}
      ></EditActivity>

      {custom ? (
        ""
      ) : (
        <button
          className="details-link btn-4"
          onClick={() => {
            window.open(
              `/poi/${encodeURIComponent(location)}/${encodeURIComponent(
                destination
              )}`,
              "_blank",
              "noopener,noreferrer"
            )
          }}
        >
          Discover more
        </button>
      )}
    </div>
  )
}
