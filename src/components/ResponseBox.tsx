import React from "react"
import { DailyActivitiesList } from "./DailyActivitiesList"
import { useGlobalContext } from "../context"

export function ResponseBox() {
  const { itineraryResponse } = useGlobalContext()

  return itineraryResponse && itineraryResponse.length > 0 ? (
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
            dayId={id}
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
    <div></div>
  )
}
