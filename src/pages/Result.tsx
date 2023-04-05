import React, { useRef } from "react"
import { ResponseBox } from "../components/ResponseBox"
import { ItineraryRequestType } from "../types/request.types"
import { Header } from "../components/Header"
import { PhotoRetrieverResponseType } from "../api/photo.api"
import { UnsplashCredit } from "../components/UnsplashCredit"

type ResultPropType = {
  data: ItineraryRequestType
  itinerary: string
  photoData: string
}

export function Result({ data, itinerary, photoData }: ResultPropType) {
  const responseBoxRef = useRef<HTMLInputElement>(null)

  const photo: PhotoRetrieverResponseType = JSON.parse(photoData)

  return (
    <div className="response-window" ref={responseBoxRef}>
      <div className="block img-background">
        <div className="credited-img">
          <img
            src={photo[0].photo.url}
            className="background-img"
            alt={photo[0].photo.alt}
          />
          <UnsplashCredit
            image={photo[0].photo.url}
            profile={photo[0].photographer.profile}
            photographer={photo[0].photographer.name}
          ></UnsplashCredit>
        </div>
      </div>
      <div className="block">
        <div className="content-container">
          <Header
            heading="Get Excited!"
            description={`You are going to ${data.destination.split(",")[0]}`}
          ></Header>
          <ResponseBox
            destination={data.destination}
            itinerary={itinerary}
          ></ResponseBox>
        </div>
      </div>
    </div>
  )
}
