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
  const [photoData, setPhotoData] = useState("")

  if (errored) {
    return <TechnicalError></TechnicalError>
  }

  if (!loading) {
    if (!itinerary) {
      return (
        <div className="home">
          <div className="block img-background">
            <img
              src={homeImg}
              className="background-img"
              alt="great ocean road in Melbourne Australia"
            />
          </div>
          <div className="block">
            <div className="content-container">
              <Header
                heading="Travel Planner"
                description="Explore the world at the speed of thought in just 3 clicks"
              ></Header>

              <MyForm
                data={data}
                setData={setData}
                setLoading={setLoading}
                setItinerary={setItinerary}
                setErrored={setErrored}
                setPhotoData={setPhotoData}
              ></MyForm>

              <PresetTrips
                setData={setData}
                setLoading={setLoading}
                setErrored={setErrored}
                setItinerary={setItinerary}
                setPhotoData={setPhotoData}
              ></PresetTrips>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <Result
          data={data}
          itinerary={itinerary}
          photoData={photoData}
        ></Result>
      )
    }
  } else {
    return (
      <div>
        <Loading
          message={`Preparing your itinerary for ${data.destination}`}
        ></Loading>
      </div>
    )
  }
}
