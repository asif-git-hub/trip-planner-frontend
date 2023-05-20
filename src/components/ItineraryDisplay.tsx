import React from "react"
import { useGlobalContext } from "../context"
import { DailyActivitiesList } from "./DailyActivitiesList"

export function ItineraryDisplay() {
  const { itineraryResponse } = useGlobalContext()

  return (
    <div className="itinerary-display-container">
      {itineraryResponse && itineraryResponse.length > 0
        ? itineraryResponse.map((dailyActivities, id) => {
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
          })
        : ""}
    </div>
  )
}
