import React, { Dispatch, SetStateAction, useState } from "react"
import { ItineraryRequestType } from "../types/request.types"
import { DataAggregator } from "../data/data.aggregator"

type TripPropsType = {
  destination: string
  days: number
  description: string
  image: string
  profile: string
  photographer: string
  alt: string
  setData: Dispatch<SetStateAction<ItineraryRequestType>>
  setLoading: Dispatch<SetStateAction<boolean>>
  setErrored: Dispatch<SetStateAction<boolean>>
  setItinerary: Dispatch<SetStateAction<string>>
  setCafeRecommendations: Dispatch<SetStateAction<string>>
  setRestaurantRecommendations: Dispatch<SetStateAction<string>>
}

export function Trip({
  destination,
  days,
  description,
  image,
  profile,
  photographer,
  alt,
  setData,
  setLoading,
  setErrored,
  setItinerary,
  setRestaurantRecommendations,
  setCafeRecommendations,
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
      const itinerary = await dataAggregator.getItinerary(
        destination,
        days.toString()
      )

      // Get Food options

      const map = new window.google.maps.Map(
        document.createElement("map") as HTMLElement,
        {
          zoom: 15,
        }
      )
      const placesService = new window.google.maps.places.PlacesService(map)

      placesService.textSearch(
        {
          query: `Top rated and most popular breakfast cafes in ${destination}`,
          type: "cafe",
        },
        (results: google.maps.places.PlaceResult[] | null, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            results &&
            results.length > 0
          ) {
            setCafeRecommendations(JSON.stringify(results))
          }
        }
      )

      placesService.textSearch(
        {
          query: `Top rated and most popular restaurants in ${destination}`,
          type: "restaurant",
        },
        (results: google.maps.places.PlaceResult[] | null, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            results &&
            results.length > 0
          ) {
            setRestaurantRecommendations(JSON.stringify(results))
          }
        }
      )

      if (itinerary) {
        setItinerary(JSON.stringify(itinerary))
        setLoading(false)
      }
    } catch (e) {
      setLoading(false)
      setErrored(true)
    }
  }
  return (
    <div className="single-trip">
      <img src={image} alt={alt} loading="lazy"></img>
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
