import React, { useEffect } from "react"
import { ResponseMenu } from "./ResponseMenu"
import { ItineraryDisplay } from "./ItineraryDisplay"
import { useGlobalContext } from "../context"
import { InfoDisplay } from "./InfoDisplay"
import { AccomodationDisplay } from "./AccomodationDisplay"
import { InfoAPI } from "../api/info.api"

export function ResponseBox() {
  const { containerToDisplay, itineraryRequest, setDestinationInfo } =
    useGlobalContext()

  const destination = itineraryRequest.destination.split(",")[0]

  useEffect(() => {
    try {
      async function getData() {
        const infoApi = new InfoAPI()

        try {
          const infoResult = await infoApi.getInfo(
            decodeURIComponent(destination)
          )
          setDestinationInfo(infoResult)
        } catch (e) {}
      }

      getData()
    } catch (e) {}
  }, [])

  return (
    <div className="response-container">
      <ResponseMenu></ResponseMenu>
      {containerToDisplay === "itinerary" ? (
        <ItineraryDisplay></ItineraryDisplay>
      ) : (
        ""
      )}
      {containerToDisplay === "info" ? <InfoDisplay></InfoDisplay> : ""}
      {containerToDisplay === "accomodation" ? (
        <AccomodationDisplay></AccomodationDisplay>
      ) : (
        ""
      )}
    </div>
  )
}
