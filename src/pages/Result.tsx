import React, { useRef } from "react"
import { ResponseBox } from "../components/ResponseBox"
import { ItineraryRequestType } from "../types/request.types"

type ResultPropType = {
  data: ItineraryRequestType
  itinerary: string
}

export function Result({ data, itinerary }: ResultPropType) {
  const responseBoxRef = useRef<HTMLInputElement>(null)

  return (
    <div className="response-window" ref={responseBoxRef}>
      <ResponseBox
        destination={data.destination}
        itinerary={itinerary}
      ></ResponseBox>
    </div>
  )
}
