import React, { Dispatch, SetStateAction, useState } from "react"
import { ItineraryRequestType } from "../types/request.types"
import { useNavigate } from "react-router-dom"

type TripPropsType = {
  destination: string
  days: number
  description: string
  image: string
  alt: string
  setData: Dispatch<SetStateAction<ItineraryRequestType>>
}

export function Trip({
  destination,
  days,
  description,
  image,
  alt,
  setData,
}: TripPropsType) {
  const [readMore, setReadMore] = useState(false)
  const navigate = useNavigate()

  async function handleSubmission() {
    setData({
      days: days.toString(),
      destination,
    })
    navigate(`/result/${days}/${destination}`)
  }

  return (
    <div className="single-trip">
      <div className="credited-img">
        <img src={`${image}`} alt={alt} loading="lazy"></img>
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
