import React, { useState } from "react"
import { MyForm } from "../components/Form"
import { Header } from "../components/Header"
import { Loading } from "../components/Loading"
import { TechnicalError } from "./Error"
import { ItineraryRequestType } from "../types/request.types"
import homeImg from "../assets/great-ocean-road.png"
import { PresetTrips } from "../components/PresetTrips"
import { Result } from "./Result"

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

  if (errored) {
    return <TechnicalError></TechnicalError>
  }

  if (!loading) {
    if (!itinerary && !cafeRecommendations && cafeRecommendations === "") {
      return (
        <div className="home">
          <div className="block home-background">
            <img
              src={homeImg}
              className="home-img"
              alt="great ocean road in Melbourne Australia"
            />
          </div>
          <div className="block">
            <div className="intro-container">
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

              <PresetTrips
                setData={setData}
                setLoading={setLoading}
                setErrored={setErrored}
                setItinerary={setItinerary}
                setCafeRecommendations={setCafeRecommendations}
                setRestaurantRecommendations={setRestaurantRecommendations}
              ></PresetTrips>
            </div>
          </div>
        </div>
      )
    } else {
      return <Result
      containerToDisplay={containerToDisplay}
      data={data}
      itinerary={itinerary}
      cafeRecommendations={cafeRecommendations}
      restaurantRecommendations={restaurantRecommendations}
      setContainerToDisplay={setContainerToDisplay}
      ></Result>
    }
  } else {
    return (
      <div>
        <Loading destination={data.destination}></Loading>
      </div>
    )
  }
}
