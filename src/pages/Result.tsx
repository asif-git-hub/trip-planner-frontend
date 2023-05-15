import React, { useEffect, useRef, useState } from "react"
import { ResponseBox } from "../components/ResponseBox"
import { Header } from "../components/Header"
import { PhotoApi } from "../api/photo.api"
import { UnsplashCredit } from "../components/UnsplashCredit"
import { useParams } from "react-router-dom"
import { DataAggregator } from "../data/data.aggregator"
import { Loading } from "../components/Loading"
import { TechnicalError } from "./errors/TechnicalError"
import { useGlobalContext } from "../context"

export function Result() {
  const responseBoxRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [errored, setErrored] = useState(false)

  const {
    itineraryResponse,
    setItineraryResponse,
    itineraryPagePhoto,
    setItineraryPagePhoto,
  } = useGlobalContext()
  const { destination } = useParams()

  useEffect(() => {
    try {
      setLoading(true)

      async function getData() {
        if (!destination) {
          throw new Error("mandatory params missing")
        }
        //
        const dataAggregator = new DataAggregator()
        const photoApi = new PhotoApi()

        const [itineraryResult, photoResult] = await Promise.allSettled([
          dataAggregator.getItinerary(decodeURIComponent(destination)),
          photoApi.getPhoto(decodeURIComponent(destination)),
        ])

        if (itineraryResult.status === "rejected") {
          throw new Error("Unable to resolve itinerary")
        }
        //
        if (itineraryResult.status === "fulfilled") {
          setItineraryResponse(itineraryResult.value)
          if (photoResult.status === "fulfilled") {
            setItineraryPagePhoto(photoResult.value)
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
      {!destination || !itineraryResponse || errored ? (
        // Invalid params or Error
        <TechnicalError></TechnicalError>
      ) : (
        <div className="response-window" ref={responseBoxRef}>
          <div className="block img-background">
            {itineraryPagePhoto ? (
              <div className="credited-img">
                <img
                  src={itineraryPagePhoto[0].photo.url}
                  className="background-img"
                  alt={itineraryPagePhoto[0].photo.alt}
                  loading="lazy"
                />
                <UnsplashCredit
                  image={itineraryPagePhoto[0].photo.url}
                  profile={itineraryPagePhoto[0].photographer.profile}
                  photographer={itineraryPagePhoto[0].photographer.name}
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
              <ResponseBox />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
