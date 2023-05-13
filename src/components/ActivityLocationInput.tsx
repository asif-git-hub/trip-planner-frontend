import { Dispatch, useEffect, useRef } from "react"
import React from "react"
import { getEnvVar } from "../utils/common.utils"
import useScript from "../hooks/use.script"
import { ActivityType } from "../types/response.types"

type GoogleInputFormPropType = {
  inputName: string
  placeholder: string
  autocompleteOptions: google.maps.places.AutocompleteOptions
  data: ActivityType
  setData: Dispatch<React.SetStateAction<ActivityType>>
}

export function ActivityLocationInput({
  inputName,
  placeholder,
  autocompleteOptions,
  data,
  setData,
}: GoogleInputFormPropType) {
  const autoCompleteRef = useRef<google.maps.places.Autocomplete>()
  const destinationInputRef = useRef<HTMLInputElement>(null)

  const GOOGLE_API_KEY = getEnvVar("REACT_APP_GOOGLE_API_KEY")

  const googleScript = useScript(
    // By default, Google Places will attempt to guess your language based on your country.
    `https://maps.googleapis.com/maps/api/js?language=en&key=${GOOGLE_API_KEY}&libraries=places&callback=Function.prototype`
  )

  const handleDestinationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Dont allow users to input
    setData({ ...data, [e.target.name]: "" })
  }

  useEffect(() => {
    // Conditions to ensure that no multiple instances of the
    console.log("ActivityLocationInput :: USEEFFECT RUNNINGG")
    if (
      autoCompleteRef.current ||
      googleScript === "loading" ||
      !destinationInputRef.current ||
      !window.google ||
      !window.google.maps ||
      !window.google.maps.places
    ) {
      return
    }

    if (googleScript === "error") {
      // Report error
      return
    }

    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      destinationInputRef.current,
      autocompleteOptions
    )

    autoCompleteRef.current.addListener("place_changed", () => {
      if (!autoCompleteRef.current) {
        return
      }

      // Retrieve the selected location with the `getPlace` method.
      const place = autoCompleteRef.current?.getPlace()
      setData((data) => ({ ...data, location: place?.name as string }))
    })
  }, [googleScript, autocompleteOptions])

  return (
    <label className="location-input">
      <div className="location-label">Location</div>
      <input
        id={inputName}
        className="location"
        ref={destinationInputRef}
        type="text"
        name={inputName}
        autoComplete="off"
        autoFocus={true}
        required={true}
        placeholder={placeholder}
        onChange={handleDestinationInput}
      />
    </label>
  )
}
