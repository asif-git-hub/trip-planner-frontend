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
        let isDifferentCityNextDay = false
        let nextCity = undefined

        if (id !== itineraryData.length - 1) {
          isDifferentCityNextDay =
            dailyActivities.city !== itineraryData[id + 1].city
          nextCity = itineraryData[id + 1].city
        }

        return (
          <DailyActivitiesList
            key={id}
            id={id}
            day={dailyActivities.day}
            destination={destination}
            activities={dailyActivities.activities}
            city={dailyActivities.city}
            geocode={dailyActivities.geocode}
            isDifferentCityNextDay={isDifferentCityNextDay}
            nextCity={nextCity}
          ></DailyActivitiesList>
        )
      })}
    </div>
  )
}
