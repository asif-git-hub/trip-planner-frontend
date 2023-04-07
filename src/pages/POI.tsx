import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ItineraryApi } from "../api/itinerary.api"
import { Loading } from "../components/Loading"
import { POIDataType } from "../types/response.types"
import { ActivityDetails } from "../components/ActivityDetails"
import { PhotoApi, PhotoRetrieverResponseType } from "../api/photo.api"
import { Header } from "../components/Header"
import { UnsplashCredit } from "../components/UnsplashCredit"

export function POI() {
  const { destination, location } = useParams()

  const [poiLoading, setPoiLoading] = useState(false)
  const [poiData, setPoiData] = useState<POIDataType[]>([])
  const [photo, setPhoto] = useState<PhotoRetrieverResponseType>()
  const [poiError, setPoiError] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const itineraryApi = new ItineraryApi()
  const photoApi = new PhotoApi()

  if (!destination || !location) {
    setPoiError(true)
  }

  useEffect(() => {
    setPoiLoading(true)
    async function getPOIData() {
      try {
        if (location && destination) {
          const [poiResult, photoResult] = await Promise.allSettled([
            itineraryApi.getPOI(decodeURI(location), decodeURI(destination)),
            photoApi.getPhoto(decodeURI(location)),
          ])

          if (poiResult.status === "rejected") {
            throw new Error("Unable to receive POI data")
          } else {
            setPoiData(poiResult.value)
          }
          if (photoResult.status === "fulfilled") {
            setPhoto(photoResult.value)
          }
        }
      } catch (e) {
        setPoiData([])
      } finally {
        setPoiLoading(false)
      }
    }
    getPOIData()
  }, [destination, location])

  if (poiLoading) {
    return <Loading message={`Looking for the best activities in ${location}`}></Loading>
  }

  if (poiError || poiData.length === 0) {
    return <p>We could not find activities for {location}</p>
  }

  return (
    <div className="response-window">
      <div className="block img-background">
        <div className="credited-img">
          {photo ? (
            <div>
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
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="block">
        <div className="content-container">
          <Header
            heading="Great Choice!"
            description={`There is so much to do in ${location}`}
          ></Header>
          <div className={`response-container`}>
            {poiData.slice(0, showAll ? 10 : 5).map((poi, id) => {
              return (
                <div key={id}>
                  <ActivityDetails
                    key={id}
                    location={poi.location}
                    description={poi.description}
                  ></ActivityDetails>
                </div>
              )
            })}
            <button
              className="poi-show-btn"
              onClick={() => {
                setShowAll(!showAll)
              }}
            >
              {showAll ? "show less" : "show more"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
