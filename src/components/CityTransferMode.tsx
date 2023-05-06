import React from "react"
import { RoundButton } from "./RoundButton"
import { FaMapMarkerAlt } from "react-icons/fa"

type CityTransferModePropType = {
  currentCity: string
  nextCity: string
  country: string
}

export function CityTransferMode({
  currentCity,
  nextCity,
  country,
}: CityTransferModePropType) {
  return (
    <div className="city-transfer-container">
      <div className="current-location-marker btn-with-text">
        <FaMapMarkerAlt className="marker-icon"></FaMapMarkerAlt>
        <p className="city-marker-text">{currentCity}</p>
      </div>
      <div className="next-location-marker btn-with-text">
        <FaMapMarkerAlt className="marker-icon"></FaMapMarkerAlt>
        <p className="city-marker-text">{nextCity}</p>
      </div>

      <div className="travel-mode-container front">
        <RoundButton
          name="car"
          link={createTransferLink(currentCity, nextCity, country, "driving")}
        ></RoundButton>
        <RoundButton
          name="transit"
          link={createTransferLink(currentCity, nextCity, country, "transit")}
        ></RoundButton>
      </div>
      <div className="dotted-line behind"></div>
    </div>
  )
}

function createTransferLink(
  currentCity: string,
  nextCity: string,
  country: string,
  mode: "driving" | "transit"
) {
  return `https://www.google.com/maps/dir/?api=1&origin=${decodeURIComponent(
    `${currentCity},${country}`
  )}&destination=${decodeURIComponent(
    `${nextCity},${country}`
  )}&travelmode=${mode}`
}
