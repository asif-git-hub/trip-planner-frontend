import React, { Dispatch, SetStateAction, useRef } from "react"
import { ResponseMenu } from "../components/ResponseMenu"
import { ResponseBox } from "../components/ResponseBox"
import { ItineraryRequestType } from "../types/request.types"

type ResultPropType = {
  containerToDisplay: string
  data: ItineraryRequestType
  itinerary: string
  cafeRecommendations: string
  restaurantRecommendations: string
  setContainerToDisplay: Dispatch<SetStateAction<string>>
}

export function Result({
  containerToDisplay,
  data,
  itinerary,
  cafeRecommendations,
  restaurantRecommendations,
  setContainerToDisplay,
}: ResultPropType) {
  const responseBoxRef = useRef<HTMLInputElement>(null)

  return (
    <div className="response-window" ref={responseBoxRef}>
      <ResponseMenu
        containerToDisplay={containerToDisplay}
        setContainerToDisplay={setContainerToDisplay}
      ></ResponseMenu>

      <ResponseBox
        containerToDisplay={containerToDisplay}
        destination={data.destination}
        itinerary={itinerary}
        cafes={cafeRecommendations}
        restaurants={restaurantRecommendations}
      ></ResponseBox>
    </div>
  )
}
