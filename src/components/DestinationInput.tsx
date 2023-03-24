import { Dispatch, useEffect, useMemo, useRef } from "react"
import { DataType } from "./Form"
import React from "react"

type DestinationFormPropType = {
  googleScript: string
  data: DataType
  setData: Dispatch<React.SetStateAction<DataType>>
}

export function DestinationInput({
  googleScript,
  data,
  setData,
}: DestinationFormPropType) {
  const autoCompleteRef = useRef<google.maps.places.Autocomplete>()
  const destinationInputRef = useRef<HTMLInputElement>(null)

  const autocompleteOptions = useMemo(
    () => ({
      fields: ["name"],
      types: ["(regions)"],
    }),
    []
  )

  const handleDestinationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only set
    setData({ ...data, [e.target.name]: "" })
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
      setData((data) => ({ ...data, ["destination"]: place?.name as string }))
    })
  }, [googleScript, autocompleteOptions, handleDestinationInput])

  return (
    <label>
      <input
        className="form-input form-row"
        id="destination"
        ref={destinationInputRef}
        type="text"
        name="destination"
        autoComplete="off"
        autoFocus
        required={true}
        placeholder="Enter a city (For example, Munich, Germany)"
        onChange={handleDestinationInput}
      />
    </label>
  )
}
