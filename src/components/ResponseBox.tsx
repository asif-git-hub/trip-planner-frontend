import React from "react"
import { DailyActivitiesList } from "./DailyActivitiesList"
import { DailyActivitiesType } from "../types/response.types"

type ResponsePropType = {
  response: string
}

export function ResponseBox({ response }: ResponsePropType) {
  const itineraryData: DailyActivitiesType[] = JSON.parse(response)

  return (
    <div className="response-container">
      {itineraryData.map((dailyActivities, id) => {
        return (
          <DailyActivitiesList
            key={id}
            day={dailyActivities.day}
            activities={dailyActivities.activities}
          ></DailyActivitiesList>
        )
      })}
    </div>
  )
}
