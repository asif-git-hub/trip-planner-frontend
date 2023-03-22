import React from "react"
import { DailyActivitiesType } from "../types/response.types"
import { ActivityDetails } from "./ActivityDetails"

export function DailyActivitiesList({ day, activities }: DailyActivitiesType) {
  return (
    <div className="activitieslist-container">
      <div className="day-container">
        <h1>Day {day}</h1>
      </div>

      {activities.map((activity, id) => {
        return (
          <ActivityDetails
            key={id}
            location={activity.location}
            description={activity.description}
          ></ActivityDetails>
        )
      })}
    </div>
  )
}
