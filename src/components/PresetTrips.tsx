import React, { Dispatch, SetStateAction } from "react"
import { presetTrips } from "../data/preset.trips"
import { Trip } from "./Trip"
import { ItineraryRequestType } from "../types/request.types"

type PresetTripsPropType = {
  setData: Dispatch<SetStateAction<ItineraryRequestType>>
}

export function PresetTrips({ setData }: PresetTripsPropType) {
  return (
    <div className="preset-trips-container">
      <div className="preset-trips-heading">
        <h4>Not sure where to go? Try these suggestions</h4>
      </div>
      <div className="underline"></div>
      <div className="trips-container">
        {presetTrips.map((trip, id) => {
          return <Trip key={id} {...trip} setData={setData}></Trip>
        })}
      </div>
    </div>
  )
}
