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
}

const unsplashreferral = "utm_source=bitesizeadventure.com&utm_medium=referral"

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
      <div className="unsplash-credit">
        <p>
          <a href={image} target="_blank" rel="noreferrer">
            photo
          </a>{" "}
          by{" "}
          <a
            href={`${profile}?${unsplashreferral}`}
            target="_blank"
            rel="noreferrer"
          >
            {photographer}
          </a>{" "}
          on{" "}
          <a
            href={`https://unsplash.com/?${unsplashreferral}`}
            target="_blank"
            rel="noreferrer"
          >
            unsplash
          </a>
        </p>
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
