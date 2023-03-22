import React, { Dispatch, useState } from "react"
import { HttpClient } from "../clients/http.client"
import { options } from "../data/options"
import { Option } from "./Option"
import { DestinationInput } from "./DestinationInput"
import { getEnvVar } from "../utils/common.utils"

export type DataType = {
  destination: string
  days: string
  includeCafes: boolean
  includeRestaurants: boolean
  includeMuseums: boolean
}

type MyFormType = {
  data: DataType
  setData: Dispatch<React.SetStateAction<DataType>>
  setLoading: Dispatch<React.SetStateAction<boolean>>
  setResponse: Dispatch<React.SetStateAction<string>>
  setErrored: Dispatch<React.SetStateAction<boolean>>
}

export function MyForm({
  data,
  setData,
  setLoading,
  setResponse,
  setErrored,
}: MyFormType) {
  const [formError, setFormError] = useState({
    isInvalid: false,
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.name === "includeCafes" ||
      e.target.name === "includeRestaurants" ||
      e.target.name === "includeMuseums"
    ) {
      if (e.target.value === "on") {
        setData({ ...data, [e.target.name]: !data[e.target.name] })
      }
    }

    if (e.target.name === "days") {
      setData({ ...data, ["days"]: e.target.value })
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

        const baseUrl = getEnvVar("REACT_APP_ITINERARY_RETRIEVER_API")
        const url = `${baseUrl}?destination=${data.destination}&days=${data.days}&includeCafes=${data.includeCafes}&includeRestaurants=${data.includeRestaurants}&includeMuseums=${data.includeMuseums}`

        const httpClient = new HttpClient()

        const res = await httpClient.get(url)

        if (res) {
          setResponse(JSON.stringify(res.data))
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
          <DestinationInput data={data} setData={setData}></DestinationInput>

          <label>
            <input
              className="form-input form-row"
              id="days"
              type="number"
              name="days"
              required={true}
              placeholder="How many days (maximum 6 days)"
              min={1}
              max={6}
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

          <div className="options-container">
            {options.map((option, id) => {
              return (
                <Option
                  key={id}
                  id={id}
                  label={option.label}
                  name={option.name}
                  checked={data[option.name]}
                  handleChange={handleChange}
                />
              )
            })}
          </div>
        </div>

        <button className={"btn"} type="submit">
          Start Planning
        </button>
      </form>
    </div>
  )
}
