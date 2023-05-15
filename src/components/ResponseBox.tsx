import React from "react"
import { DailyActivitiesList } from "./DailyActivitiesList"
import { useGlobalContext } from "../context"
import { TechnicalError } from "../pages/errors/TechnicalError"

export function ResponseBox() {
  const { itineraryResponse } = useGlobalContext()

  return itineraryResponse ? (
    <div className="response-container">
      
      {itineraryResponse.map((dailyActivities, id) => {

        let isDifferentCityNextDay = false
        let nextCity = undefined

        if (id !== itineraryResponse.length - 1) {
          isDifferentCityNextDay =
            dailyActivities.city !== itineraryResponse[id + 1].city
          nextCity = itineraryResponse[id + 1].city
        }

        return (
          <DailyActivitiesList
            key={id}
            id={id}
            day={dailyActivities.day}
            activities={dailyActivities.activities}
            city={dailyActivities.city}
            geocode={dailyActivities.geocode}
            isDifferentCityNextDay={isDifferentCityNextDay}
            nextCity={nextCity}
          ></DailyActivitiesList>
        )
      })}
    </div>
  ) : (
    <TechnicalError></TechnicalError>
  )
}
