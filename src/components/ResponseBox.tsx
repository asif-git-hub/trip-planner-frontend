import React from "react"
import { DailyActivitiesList } from "./DailyActivitiesList"
import { DailyActivitiesType } from "../types/response.types"

type ResponsePropType = {
  destination: string
  itinerary: string
}

export function ResponseBox({ destination, itinerary }: ResponsePropType) {
  const itineraryData: DailyActivitiesType[] = JSON.parse(itinerary)

  return (
    <div className="response-container">
      {/* Itinerary */}
      {itineraryData.map((dailyActivities, id) => {
        return (
          <DailyActivitiesList
            key={id}
            day={dailyActivities.day}
            destination={destination}
            activities={dailyActivities.activities}
            city={dailyActivities.city}
          ></DailyActivitiesList>
        )
      })}
    </div>
  )
}
