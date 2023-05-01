import React from "react"
import { useNavigate } from "react-router-dom"
import { PhotoRetrieverResponseType } from "../api/photo.api"

type CityCardPropType = {
  city: string
  description: string
  imageData: PhotoRetrieverResponseType | undefined
}

export function CityCard({ city, description, imageData }: CityCardPropType) {
  const navigate = useNavigate()

  return (
    <div className="single-trip">
      <div className="credited-img">
        {
            (imageData && imageData.length > 0)? 
            <img src={`${imageData[0].photo.url}`} alt={imageData[0].photo.alt} loading="lazy"></img>
            :
            ""
        }
      </div>
      <div className="trip-info">
        <h5>{city}</h5>
      </div>
      <p>
        {description}
      </p>
      <div className="city-form">
        <button className="btn">Start Planning</button>
      </div>
    </div>
  )
}
