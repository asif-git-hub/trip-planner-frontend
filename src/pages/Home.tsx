import React, { useRef, useState } from "react"
import { MyForm } from "../components/Form"
import { Header } from "../components/Header"
import { Loading } from "../components/Loading"
import { ResponseBox } from "../components/ResponseBox"
import { TechnicalError } from "./Error"
import { ResponseMenu } from "../components/ResponseMenu"
import { ItineraryRequestType } from "../types/request.types"

export function Home() {
  const [loading, setLoading] = useState(false)
  const [errored, setErrored] = useState(false)

  // data to be sent
  const [data, setData] = useState<ItineraryRequestType>({
    destination: "",
    days: "",
  })

  const [itinerary, setItinerary] = useState("")
  const [cafeRecommendations, setCafeRecommendations] = useState("")
  const [restaurantRecommendations, setRestaurantRecommendations] = useState("")

  const [containerToDisplay, setContainerToDisplay] =
    useState("itinerary-button")

  const responseBoxRef = useRef<HTMLInputElement>(null)

  if (errored) {
    return <TechnicalError></TechnicalError>
  }

  if (!loading) {
    if (!itinerary && !cafeRecommendations && cafeRecommendations === "") {
      return (
        <div className="home">
          <Header></Header>

          <MyForm
            data={data}
            setData={setData}
            setLoading={setLoading}
            setItinerary={setItinerary}
            setCafeRecommendations={setCafeRecommendations}
            setRestaurantRecommendations={setRestaurantRecommendations}
            setErrored={setErrored}
          ></MyForm>
        </div>
      )
    } else {
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
  } else {
    return (
      <div>
        <Loading destination={data.destination}></Loading>
      </div>
    )
  }
}
