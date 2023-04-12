import React, { Dispatch, SetStateAction, useState } from "react"
import { DestinationInput } from "./DestinationInput"
import { getEnvVar } from "../utils/common.utils"
import useScript from "../hooks/use.script"
import { useNavigate } from "react-router-dom"
import { ItineraryRequestType } from "../types/request.types"

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
      navigate(`/result/${data.days}/${data.destination}`)
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
