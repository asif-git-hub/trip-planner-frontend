import React from "react"
import { presetTrips } from "../data/preset.trips"
import { Trip } from "./Trip"
import { shuffleArray } from "../utils/common.utils"


export function PresetTrips() {

  return (
    <div className="preset-trips-container">
      <div className="preset-trips-heading">
        <h4>Not sure where to go? Try these suggestions</h4>
      </div>
      <div className="underline"></div>
      <div className="trips-container">
        {shuffleArray(presetTrips).map((trip, id) => {
          return <Trip key={id} {...trip}></Trip>
        })}
      </div>
    </div>
  )
}
