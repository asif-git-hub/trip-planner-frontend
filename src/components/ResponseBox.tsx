import React from "react"
import { DailyActivitiesList } from "./DailyActivitiesList"
import { ItineraryResponseType } from "../types/response.types"

type ResponsePropType = {
  destination: string
  itineraryData: ItineraryResponseType
}

export function ResponseBox({ destination, itineraryData }: ResponsePropType) {

  return (
    <div className="response-container">
      
      {itineraryData.map((dailyActivities, id) => {
        return (
          <DailyActivitiesList
            key={id}
            id={id}
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
