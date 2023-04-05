import React, { Dispatch, SetStateAction, useState } from "react"
import { ItineraryRequestType } from "../types/request.types"
import { DataAggregator } from "../data/data.aggregator"
import { PhotoApi } from "../api/photo.api"

type TripPropsType = {
  destination: string
  days: number
  description: string
  image: string
  alt: string
  setData: Dispatch<SetStateAction<ItineraryRequestType>>
  setLoading: Dispatch<SetStateAction<boolean>>
  setErrored: Dispatch<SetStateAction<boolean>>
  setItinerary: Dispatch<SetStateAction<string>>
  setPhotoData: Dispatch<SetStateAction<string>>
}

export function Trip({
  destination,
  days,
  description,
  image,
  alt,
  setData,
  setLoading,
  setErrored,
  setItinerary,
  setPhotoData,
}: TripPropsType) {
  const [readMore, setReadMore] = useState(false)

  async function handleSubmission() {
    setData({
      days: days.toString(),
      destination,
    })

    try {
      setLoading(true)

      const dataAggregator = new DataAggregator()
      //
      const photoApi = new PhotoApi()

      const [itineraryResult, photoResult] = await Promise.allSettled([
        dataAggregator.getItinerary(destination, days.toString()),
        photoApi.getPhoto(destination),
      ])

      if (itineraryResult.status === "rejected") {
        throw new Error("Unable to resolve itinerary")
      }
      //
      console.log(itineraryResult)
      console.log(photoResult)
      if (itineraryResult.status === "fulfilled") {
        setItinerary(JSON.stringify(itineraryResult.value))
        if (photoResult.status === "fulfilled") {
          setPhotoData(JSON.stringify(photoResult.value))
        }
        setLoading(false)
      }
    } catch (e) {
      setLoading(false)
      setErrored(true)
    }
  }
  return (
    <div className="single-trip">
      <div className="credited-img">
        <img src={image} alt={alt} loading="lazy"></img>
      </div>
      <div className="trip-info">
        <h5>
          Best of {destination} in {days} days
        </h5>
      </div>
      <p>
        {readMore ? description : `${description.substring(0, 200)}...`}
        <button className="read-more" onClick={() => setReadMore(!readMore)}>
          {readMore ? "show less" : "  read more"}
        </button>
      </p>
      <div className="submit-trip-button">
        <button className="btn" onClick={handleSubmission}>
          Start Planning
        </button>
      </div>
    </div>
  )
}
