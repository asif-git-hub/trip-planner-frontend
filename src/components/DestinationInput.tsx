import { Dispatch, useEffect, useMemo, useRef } from "react";
import useScript from "../hooks/use.script";
import { DataType } from "./Form";
import React from "react";
import { getEnvVar } from '../utils/common.utils';

type DestinationFormPropType = {
    data: DataType
    setData: Dispatch<React.SetStateAction<DataType>>
}

export function DestinationInput({data, setData}: DestinationFormPropType) {

    const autoCompleteRef = useRef<google.maps.places.Autocomplete>();
    const destinationInputRef = useRef<HTMLInputElement>(null);
  
    const autocompleteOptions = useMemo(
      () => ({
        fields: ["name"],
        types: ["(cities)"],
      }),
      []
    )
  
    const GOOGLE_API_KEY = getEnvVar("REACT_APP_GOOGLE_API_KEY");
  
    const scriptStatus = useScript(
      // By default, Google Places will attempt to guess your language based on your country.
      // However, you may specify it explicitly with the `language` parameter.
      `https://maps.googleapis.com/maps/api/js?language=en&key=${GOOGLE_API_KEY}&libraries=places&callback=Function.prototype`
    )

    const handleDestinationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Only set
        setData({ ...data, [e.target.name]: "" });
    }

    useEffect(() => {
        // Conditions to ensure that no multiple instances of the
        if (
          autoCompleteRef.current ||
          scriptStatus === "loading" ||
          !destinationInputRef.current ||
          !window.google ||
          !window.google.maps ||
          !window.google.maps.places
        ) {
          return
        }
        
        if (scriptStatus === "error") {
          // Report error
          return
        }
      
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
          destinationInputRef.current,
          autocompleteOptions
        );
    
        autoCompleteRef.current.addListener("place_changed", () => {
          if (!autoCompleteRef.current) {
            return
          }
      
          // Retrieve the selected location with the `getPlace` method.
          const place = autoCompleteRef.current?.getPlace()
          setData(data => ({ ...data, ["destination"]: place?.name as string }));
    
        });
    
      }, [scriptStatus, autocompleteOptions, handleDestinationInput])



      return (
        <label>
          <input 
              className="form-input form-row"
              id="destination"
              ref={destinationInputRef}
              type="text"
              name="destination"
              autoComplete="off"
              required={true}
              placeholder="Enter a city (For example, Munich, Germany)"
              onChange={handleDestinationInput}
              />
      </label>
      )
}