import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobalContext } from "../context"

type TripPropsType = {
  destination: string
  description: string
  image: string
  alt: string
}

export function Trip({
  destination,
  description,
  image,
  alt,
}: TripPropsType) {
  const {setItineraryRequest} = useGlobalContext()

  const [readMore, setReadMore] = useState(false)
  const navigate = useNavigate()

  async function handleSubmission() {
    setItineraryRequest({
      destination,
    })

    navigate(`/result/${encodeURIComponent(destination)}`)
  }

  return (
    <div className="single-trip">
      <div className="credited-img">
        <img src={`${image}`} alt={alt} loading="lazy"></img>
      </div>
      <div className="trip-info">
        <h5>Best of {destination}</h5>
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
