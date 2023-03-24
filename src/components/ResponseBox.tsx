import React from "react"
import { DailyActivitiesList } from "./DailyActivitiesList"
import { DailyActivitiesType } from "../types/response.types"
import { FoodRecommendationList } from "./FoodRecommendationList"

type ResponsePropType = {
  containerToDisplay: string
  itinerary: string
  cafes: string
  restaurants: string
}

export function ResponseBox({
  containerToDisplay,
  itinerary,
  cafes,
  restaurants,
}: ResponsePropType) {
  const itineraryData: DailyActivitiesType[] = JSON.parse(itinerary)

  return (
    <div className="response-container">
      {/* Food recommendation */}
      {containerToDisplay === "food-button" ? (
        <FoodRecommendationList
          cafes={cafes}
          restaurants={restaurants}
        ></FoodRecommendationList>
      ) : (
        ""
      )}
      {/* Itinerary */}
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
    </div>
  )
}
