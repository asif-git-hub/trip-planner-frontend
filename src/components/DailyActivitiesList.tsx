import React from "react"
import { DailyActivitiesType } from "../types/response.types"
import { ActivityDetails } from "./ActivityDetails"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

type DailyActivitiesListPropType = DailyActivitiesType & { destination: string }

export function DailyActivitiesList({
  day,
  destination,
  activities,
}: DailyActivitiesListPropType) {


  // const geocodeUtil = new GeoCodeUtil();

  // const batchQuery = geocodeUtil.getBatchQuery(activities, destination)

  // const geocodes = geoCoder.batchGeocode(batchQuery)

  return (
    <div className="activitieslist-container">
      <div className="day-container">
        <h1>Day {day}</h1>
      </div>

      {activities.map((activity, id) => {
        return (
          <div>
            <ActivityDetails
              key={id}
              location={activity.location}
              description={activity.description}
            ></ActivityDetails>
          </div>
        )
      })}

      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
