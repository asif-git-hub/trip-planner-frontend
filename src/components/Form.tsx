import React, { Dispatch, useState } from "react"
import { DestinationInput } from "./DestinationInput"
import { DataAggregator } from "../data/data.aggregator"
import { getEnvVar } from "../utils/common.utils"
import useScript from "../hooks/use.script"
import { ItineraryRequestType } from "../types/request.types"

type MyFormType = {
  data: ItineraryRequestType
  setData: Dispatch<React.SetStateAction<ItineraryRequestType>>
  setLoading: Dispatch<React.SetStateAction<boolean>>
  setItinerary: Dispatch<React.SetStateAction<string>>
  setCafeRecommendations: Dispatch<React.SetStateAction<string>>
  setRestaurantRecommendations: Dispatch<React.SetStateAction<string>>
  setErrored: Dispatch<React.SetStateAction<boolean>>
}

export function MyForm({
  data,
  setData,
  setLoading,
  setItinerary,
  setCafeRecommendations,
  setRestaurantRecommendations,
  setErrored,
}: MyFormType) {
  const [formError, setFormError] = useState({
    isInvalid: false,
    message: "",
  })

  const GOOGLE_API_KEY = getEnvVar("REACT_APP_GOOGLE_API_KEY")

  const scriptStatus = useScript(
    // By default, Google Places will attempt to guess your language based on your country.
    `https://maps.googleapis.com/maps/api/js?language=en&key=${GOOGLE_API_KEY}&libraries=places&callback=Function.prototype`
  )

  const dataAggregator = new DataAggregator()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "days") {
      setData({ ...data, days: e.target.value })
    }
  }

  function validateInput() {
    let isFormValid = true

    if (!data.destination || data.destination === "") {
      isFormValid = false
      setFormError({
        isInvalid: true,
        message: "Please pick a destination from the list",
      })
    }

    if (!data.days || data.days === "") {
      isFormValid = false
      setFormError({
        isInvalid: true,
        message: "Number of days must be between 1 and 6",
      })
    }

    return isFormValid
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isFormValid = validateInput()

    if (isFormValid) {
      try {
        setLoading(true)

        const itinerary = await dataAggregator.getItinerary(
          data.destination,
          data.days
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
            query: `Top rated and most popular breakfast cafes in ${data.destination}`,
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
            query: `Top rated and most popular restaurants in ${data.destination}`,
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
        // Catch all exceptions
        setErrored(true)
        setLoading(false)
      }
    }
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-grid-section">
          <DestinationInput
            googleScript={scriptStatus}
            data={data}
            setData={setData}
          ></DestinationInput>

          <label>
            <input
              className="form-input form-row"
              id="days"
              type="number"
              name="days"
              required={true}
              placeholder="How many days (maximum 7 days)"
              min={1}
              max={7}
              onChange={handleChange}
            />
          </label>

          {formError.isInvalid ? (
            <div>
              <p>{formError.message}</p>
            </div>
          ) : (
            ""
          )}
        </div>

        <button className={"btn"} type="submit">
          Start Planning
        </button>
      </form>
    </div>
  )
}
