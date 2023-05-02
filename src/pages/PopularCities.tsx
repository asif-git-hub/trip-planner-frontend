import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ItineraryApi } from "../api/itinerary.api"
import { PopularCitiesResponseType } from "../types/response.types"
import { Loading } from "../components/Loading"
import { PhotoApi, PhotoRetrieverResponseType } from "../api/photo.api"
import { UnsplashCredit } from "../components/UnsplashCredit"
import { Header } from "../components/Header"
import { CityCard } from "../components/CityCard"

export function PopularCities() {
  const { country } = useParams()
  const [popcityLoading, setPopCityLoading] = useState(false)
  const [errored, setErrored] = useState(false)
  const [popularCities, setPopularCities] = useState<
    PopularCitiesResponseType[]
  >([])
  const [countryPhoto, setCountryPhoto] = useState<PhotoRetrieverResponseType>()

  useEffect(() => {
    try {
      setPopCityLoading(true)

      async function getData() {
        if (!country) {
          throw new Error("mandatory params missing")
        }
        //
        const itineraryApi = new ItineraryApi()
        const photoApi = new PhotoApi()

        const [popcityData, photoResult] = await Promise.allSettled([
          itineraryApi.getPopularCities(country),
          photoApi.getPhoto(country),
        ])

        if (popcityData.status === "rejected") {
          throw new Error("Unable to resolve popular cities")
        }
        //
        if (popcityData.status === "fulfilled") {
          setPopularCities(popcityData.value)
          if (photoResult.status === "fulfilled") {
            setCountryPhoto(photoResult.value)
          }
          setPopCityLoading(false)
        }
      }
      getData()
    } catch (e) {
      setPopCityLoading(false)
      setErrored(true)
    }
  }, [])

  if (popcityLoading) {
    return (
      <Loading message={`Searching for the best spots in ${country}`}></Loading>
    )
  }

  return (
    <div>
      <div className="response-window">
        <div className="block img-background">
          {countryPhoto ? (
            <div className="credited-img">
              <img
                src={countryPhoto[0].photo.url}
                className="background-img"
                alt={countryPhoto[0].photo.alt}
                loading="lazy"
              />
              <UnsplashCredit
                image={countryPhoto[0].photo.url}
                profile={countryPhoto[0].photographer.profile}
                photographer={countryPhoto[0].photographer.name}
              ></UnsplashCredit>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="block">
          <div className="content-container">
            <Header
              heading={`Experience the magic of ${country}`}
              description={`There are so many wonderful cities to explore`}
            ></Header>
            <div className="response-container">
              {popularCities.map((data, id) => {
                return (
                  <CityCard
                    key={id}
                    city={data.city}
                    description={data.description}
                    imageData={data.imgData}
                  ></CityCard>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
