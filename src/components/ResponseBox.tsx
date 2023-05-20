import React from "react"
import { ResponseMenu } from "./ResponseMenu"
import { ItineraryDisplay } from "./ItineraryDisplay"
import { useGlobalContext } from "../context"
import { InfoDisplay } from "./InfoDisplay"
import { AccomodationDisplay } from "./AccomodationDisplay"

export function ResponseBox() {
  const { containerToDisplay } = useGlobalContext()

  return (
    <div className="response-container">
      <ResponseMenu></ResponseMenu>
      {containerToDisplay === "itinerary" ? (
        <ItineraryDisplay></ItineraryDisplay>
      ) : (
        ""
      )}
      {containerToDisplay === "info" ? <InfoDisplay></InfoDisplay> : ""}
      {containerToDisplay === "accomodation" ? <AccomodationDisplay></AccomodationDisplay> : ""}

    </div>
  )
}
