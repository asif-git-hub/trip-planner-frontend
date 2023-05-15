import { Dispatch, useEffect, useMemo, useRef } from "react"
import React from "react"
import { ItineraryRequestType } from "../types/request.types"
import { getEnvVar } from "../utils/common.utils"
import useScript from "../hooks/use.script"
import { useGlobalContext } from "../context"

type DestinationFormPropType = {
  inputName: string
  placeholder: string
  autocompleteOptions: google.maps.places.AutocompleteOptions
}

export function DestinationInput({
  inputName,
  placeholder,
  autocompleteOptions,
}: DestinationFormPropType) {
  const autoCompleteRef = useRef<google.maps.places.Autocomplete>()
  const destinationInputRef = useRef<HTMLInputElement>(null)
  const { itineraryRequest, setItineraryRequest } = useGlobalContext()

  const GOOGLE_API_KEY = getEnvVar("REACT_APP_GOOGLE_API_KEY")

  const googleScript = useScript(
    // By default, Google Places will attempt to guess your language based on your country.
    `https://maps.googleapis.com/maps/api/js?language=en&key=${GOOGLE_API_KEY}&libraries=places&callback=Function.prototype`
  )

  const handleDestinationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Dont allow users to input

    setItineraryRequest({ ...itineraryRequest, [e.target.name]: "" })
  }

  useEffect(() => {
    // Conditions to ensure that no multiple instances of the
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
      setItineraryRequest((itineraryRequest) => ({
        ...itineraryRequest,
        destination: place?.name as string,
      }))
    })
  }, [googleScript, autocompleteOptions, handleDestinationInput])

  return (
    <label>
      <input
        className="form-input form-row"
        id={inputName}
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
