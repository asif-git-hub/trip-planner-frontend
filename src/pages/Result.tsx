import React, { useEffect, useRef, useState } from "react"
import { ResponseBox } from "../components/ResponseBox"
import { Header } from "../components/Header"
import { PhotoApi, PhotoRetrieverResponseType } from "../api/photo.api"
import { UnsplashCredit } from "../components/UnsplashCredit"
import { useParams } from "react-router-dom"
import { DataAggregator } from "../data/data.aggregator"
import { ItineraryResponseType } from "../types/response.types"
import { Loading } from "../components/Loading"
import { TechnicalError } from "./errors/TechnicalError"

export function Result() {
  const responseBoxRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [itinerary, setItinerary] = useState<ItineraryResponseType>()
  const [resultPhoto, setResultPhoto] = useState<PhotoRetrieverResponseType>()
  const [errored, setErrored] = useState(false)
  const { days, destination } = useParams()

  useEffect(() => {
    try {
      setLoading(true)

      async function getData() {
        if (!destination || !days) {
          throw new Error("mandatory params missing")
        }
        //
        const dataAggregator = new DataAggregator()
        const photoApi = new PhotoApi()

        const [itineraryResult, photoResult] = await Promise.allSettled([
          dataAggregator.getItinerary(destination, days),
          photoApi.getPhoto(destination),
        ])

        if (itineraryResult.status === "rejected") {
          throw new Error("Unable to resolve itinerary")
        }
        //
        if (itineraryResult.status === "fulfilled") {
          setItinerary(itineraryResult.value)
          if (photoResult.status === "fulfilled") {
            setResultPhoto(photoResult.value)
          }
          setLoading(false)
        }
      }
      getData()
    } catch (e) {
      setLoading(false)
      setErrored(true)
    }
  }, [])

  if (loading) {
    return (
      <Loading
        message={`Preparing your itinerary for ${destination}`}
      ></Loading>
    )
  }

  return (
    <div>
      {!days || !destination || !itinerary || errored ? (
        // Invalid params or Error
        <TechnicalError></TechnicalError>
      ) : (
        <div className="response-window" ref={responseBoxRef}>
          <div className="block img-background">
            {resultPhoto ? (
              <div className="credited-img">
                <img
                  src={resultPhoto[0].photo.url}
                  className="background-img"
                  alt={resultPhoto[0].photo.alt}
                  loading="lazy"
                />
                <UnsplashCredit
                  image={resultPhoto[0].photo.url}
                  profile={resultPhoto[0].photographer.profile}
                  photographer={resultPhoto[0].photographer.name}
                ></UnsplashCredit>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="block">
            <div className="content-container">
              <Header
                heading="Get Excited!"
                description={`You are going to ${destination.split(",")[0]}`}
              ></Header>
              <ResponseBox
                destination={destination}
                itineraryData={itinerary}
              ></ResponseBox>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
