import React from "react"
import { DailyActivitiesList } from "./DailyActivitiesList"
import { DailyActivitiesType } from "../types/response.types"

type ResponsePropType = {
  containerToDisplay: string
  response: string
}

export function ResponseBox({
  containerToDisplay,
  response,
}: ResponsePropType) {
  const itineraryData: DailyActivitiesType[] = JSON.parse(response)

  return (
    <div className="response-container">
      {containerToDisplay === "itinerary-button"
        ? itineraryData.map((dailyActivities, id) => {
            return (
              <DailyActivitiesList
                key={id}
                day={dailyActivities.day}
                activities={dailyActivities.activities}
              ></DailyActivitiesList>
            )
          })
        : ""}
      {containerToDisplay === "food-button" ? <div>Coming soon</div> : ""}
    </div>
  )
}
