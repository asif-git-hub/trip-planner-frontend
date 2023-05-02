import React, { Dispatch, SetStateAction, useState } from "react"
import { DestinationInput } from "./DestinationInput"
import { getEnvVar } from "../utils/common.utils"
import useScript from "../hooks/use.script"
import { useNavigate } from "react-router-dom"
import { ItineraryRequestType } from "../types/request.types"
import { determineDestinationType } from "../utils/destination.utils"

type MyFormType = {
  data: ItineraryRequestType
  setData: Dispatch<SetStateAction<ItineraryRequestType>>
}

export function MyForm({ data, setData }: MyFormType) {
  const [formError, setFormError] = useState({
    isInvalid: false,
    message: "",
  })

  const navigate = useNavigate()

  const GOOGLE_API_KEY = getEnvVar("REACT_APP_GOOGLE_API_KEY")

  const scriptStatus = useScript(
    // By default, Google Places will attempt to guess your language based on your country.
    `https://maps.googleapis.com/maps/api/js?language=en&key=${GOOGLE_API_KEY}&libraries=places&callback=Function.prototype`
  )

  function validateInput() {
    let isFormValid = true

    if (!data.destination || data.destination === "") {
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
    if (isFormValid) {
      // Check destination type - city or country
      const destinationType = determineDestinationType(data.destination)
      navigate(`/result/${encodeURIComponent(data.destination)}`)
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
            googleScript={scriptStatus}
            data={data}
            setData={setData}
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
