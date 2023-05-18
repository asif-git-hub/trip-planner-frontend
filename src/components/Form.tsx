import React, { useMemo, useState } from "react"
import { DestinationInput } from "./DestinationInput"
import { useNavigate } from "react-router-dom"
import { determineDestinationType } from "../utils/destination.utils"
import { useGlobalContext } from "../context"
import {
  getUseCountFromLocalStorage,
  updateUseCountInLocalStorage,
} from "../utils/storage.utils"

export function MyForm() {
  const { itineraryRequest } = useGlobalContext()

  const [formError, setFormError] = useState({
    isInvalid: false,
    message: "",
  })

  const navigate = useNavigate()

  const destinationAutocompleteOptions = useMemo(
    () => ({
      fields: ["name"],
      types: ["(regions)"],
    }),
    []
  )

  function validateInput() {
    let isFormValid = true

    if (!itineraryRequest.destination || itineraryRequest.destination === "") {
      isFormValid = false
      setFormError({
        isInvalid: true,
        message: "Please pick a destination from the list",
      })
    }

    return isFormValid
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isFormValid = validateInput()
    const maxUseCount = 2
    const currentCount = getUseCountFromLocalStorage()
    console.log(currentCount)
    if (currentCount > maxUseCount) {
      // You need to sign in/up
      console.log("You have used this so many times time to login")
    } else {
      updateUseCountInLocalStorage(currentCount + 1)
    }

    if (isFormValid) {
      // Check destination type - city or country
      const destinationType = determineDestinationType(
        itineraryRequest.destination
      )
      navigate(`/result/${encodeURIComponent(itineraryRequest.destination)}`)
      // if (destinationType === "city") {
      //   navigate(`/result/${data.days}/${data.destination}`)
      // } else if (destinationType === "country") {
      //   navigate(`/popular-cities/${data.destination}`)
      // }
    }
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-grid-section">
          <DestinationInput
            inputName="destination"
            placeholder="Where can we take you?"
            autocompleteOptions={destinationAutocompleteOptions}
          ></DestinationInput>

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
